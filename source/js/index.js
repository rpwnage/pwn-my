currentFirmware = function (userAgent) {
    return userAgent.match(/\OS (.*?)\ like/)[1].replaceAll("_", ".");
}

var kickstartFunction = () => alert('unsupported!');

const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();
var content = document.querySelector('.content')
var button = document.querySelector('#jbButton')
var slideOffset = 0
var jbTriggered = false;

button.addEventListener('pointerdown', function (event) {
    if (jbTriggered) return false;
    slideOffset = event.clientX
    document.body.classList.add('sliding')
}, false);

button.addEventListener('pointermove', function (event) {
    if (jbTriggered) return false;
    console.log(event)
    var pos = Math.min(Math.max(event.clientX - slideOffset,0),sbtn.offsetLeft - 45)
    var pcnt = pos / (sbtn.offsetLeft - 45)
    console.log(pos,sbtn.offsetLeft - 45)
    button.style.width = pos + 64 + "px"
}, false);

button.addEventListener('pointerup', function (event) {
    if (jbTriggered) return false;
    var pos = Math.min(Math.max(event.clientX - slideOffset,0),sbtn.offsetLeft - 45)
    var pcnt = pos / (sbtn.offsetLeft - 45)
    if (pcnt < 0.99) {
        document.body.classList.remove('sliding')
        button.style.width = "64px"
    } else {
        jbTriggered = true;
        button.classList.add("active")
        kickstartFunction()
    }
}, false);





var sbtn = document.querySelector('#settingsButton')
var settingsTriggered = false
var supportsPressure = false;
sbtn.addEventListener('pointerdown', function (event) {
    supportsPressure = false
}, false);
sbtn.addEventListener('pointermove', function (event) {
    supportsPressure = true;
    console.log(event)
    sbtn.style.transform = `scale(${event.pressure + 1})`
    if (event.pressure > 0.8) {
        settingsTriggered = true;
        sbtn.classList.add('triggered');
    }
}, false);
sbtn.addEventListener('pointerup', function (event) {
    sbtn.style.transform = ``
    if (supportsPressure && !settingsTriggered) return false;
    settingsTriggered = false;
    document.body.classList.add("optionsOpen")
    sbtn.classList.remove('triggered');
}, false);


window.addEventListener('touchmove',(e) => {
    e.preventDefault(true)
    return false;
},{passive: false})

var progText = document.querySelector(".progress")
var progBar = document.querySelector("#progressBar")
function updateProgress(text,progress) {
    progText.innerText = text
    progBar.style.width = progress + "%"
}

console.log(currentFirmware(navigator.userAgent));
if (currentFirmware(navigator.userAgent) === "14.5") {
    document.body.classList.remove('unsupported');
    kickstartFunction = kickstart145;
} else if (currentFirmware(navigator.userAgent) === "14.6") {
    document.body.classList.remove('unsupported');
    kickstartFunction = kickstart146;
} else {
    if (currentFirmware(navigator.userAgent).length < 5) {
        document.querySelector('h3').innerText = `${currentFirmware(navigator.userAgent)} is not currently supported.`
    }
}