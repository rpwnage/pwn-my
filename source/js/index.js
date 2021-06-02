currentFirmware = function(userAgent) {
    return userAgent.match(/\OS (.*?)\ like/)[1].replaceAll("_", ".");
}
function print(str) {
            var log = document.getElementById('log');
            console.log(str);
            if (log) {
                log.innerText += "[+] "+str + '\n';
            }
        }
async function pwnMe() {
	print(currentFirmware(navigator.userAgent));
    if(currentFirmware(navigator.userAgent) === "14.5"){
        print("Starting exploitation for iOS 14.5");
    }else if(currentFirmware(navigator.userAgent) === "14.6"){
        print("Starting exploitation for iOS 14.6");
        await kickstart146();
    }else {
        print("Detected a unsupported Device/Version")
    }
}
