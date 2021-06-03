currentFirmware = function(userAgent) {
    return userAgent.match(/\OS (.*?)\ like/)[1].replaceAll("_", ".");
}

async function pwnMe() {
	console.log(currentFirmware(navigator.userAgent));
    if(currentFirmware(navigator.userAgent) === "14.5"){
        console.log("Starting exploitation for iOS 14.5");
    }else if(currentFirmware(navigator.userAgent) === "14.6"){
        console.log("Starting exploitation for iOS 14.6");
        await kickstart146();
    }else {
        console.log("Detected a unsupported Device/Version");
    }
}

const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();