var headerTapCounter = 0;

currentFirmware = function (userAgent) {
	return userAgent.match(/\OS (.*?)\ like/)[1].replaceAll("_", ".");
};

function slideEasterEgg() {
	headerTapCounter++;
	if (headerTapCounter == 5) {
		document.getElementById("jbButton").style.display = "none";
		document.getElementById("page-wrap").style.display = "block";
	}
}

async function pwnMe() {
	if (location.protocol != "https:") {
		document.getElementById("jbButton").disabled = true;
		if (navigator.userAgent.includes("Mac OS X")) {
			alert("MacOS is not supported");
		} else if (currentFirmware(navigator.userAgent).startsWith("14.5")) {
			socket.emit("log_normal", "Starting exploitation for iOS 14.5");
			await kickstart145();
		} else if (currentFirmware(navigator.userAgent).startsWith("14.6")) {
			socket.emit("log_normal", "Starting exploitation for iOS 14.6");
			await kickstart146();
		} else {
			socket.emit("error", "Detected a unsupported version/device");
		}
	}else{
        alert("exploitation only works over https");
    }
}

const appHeight = () => {
	const doc = document.documentElement;
	doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

window.addEventListener("resize", appHeight);
appHeight();
