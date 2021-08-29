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
	if (location.protocol === "https:") {
	  if (
		navigator.userAgent.includes("iPhone") ||
		navigator.userAgent.includes("iPad")
	  ) {
		if (navigator.userAgent.includes("Macintosh")) {
		  alert("MacOS is not supported");
		  return;
		}
		
		if (currentFirmware(navigator.userAgent).startsWith("14.5")) {
		  socket.emit("log_normal", "Starting exploitation for iOS 14.5");
		  await kickstart145();
		  return;
		}
		
		if (currentFirmware(navigator.userAgent).startsWith("14.6")) {
		  socket.emit("log_normal", "Starting exploitation for iOS 14.6");
		  await kickstart146();
		  return;
		}
	  } else {
		alert("Detected a unsupported version/device");
		socket.emit("error", "Detected a unsupported version/device");
		return;
	  }
	} else {
	  document.getElementById("jbButton").disabled = true;
	  alert("exploitation only works over https");
	}
  }

const appHeight = () => {
	const doc = document.documentElement;
	doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

window.addEventListener("resize", appHeight);
appHeight();

// window.onload = () => {
//	//force redirect to https
//	if (window.location.protocol !== "https:") {
//		window.location.protocol = "https:";
//	}
// }

$(document).ready(function() {

	console.log("document loaded");
	$("section.loader").addClass('load');
	$("body").removeClass();

	$(window).resize(function() {
		var height = $("section.loader").height();
		$("body.loaded section.loader").css("transform", "translateY(-" + height + "px)" );
	});

	// prep-start
	setTimeout(function() {
		$("body").addClass('start');
		$("section.loader").removeClass('load');
		console.log("prep animation");
	}, 100);

	// Start Animation
	setTimeout(function() {
		$("section.loader").addClass('start');
		$("body").removeClass('start').addClass('loading');
		console.log("started animation");
	}, 1000);

	// prep-end Animation
	setTimeout(function() {
		$("body").removeClass('loading').addClass('finalizing');
	}, 2000);

	// End Animation
	setTimeout(function() {
		$("section.loader").removeClass('start');
		$("body").removeClass('finalizing').addClass('loaded');
		var height = $("section.loader").height();
		$("section.loader").css("transform", "translateY(-" + height + "px)" );
		console.log("finished animation");
	}, 3000);
});