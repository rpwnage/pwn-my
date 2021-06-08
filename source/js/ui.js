var stateReady   = document.getElementById('state-ready')
var statePrgress = document.getElementById('state-inprogress')
var stateDone    = document.getElementById('state-done')

var preflightInstructions = document.getElementById('preflight-instructions')
var logWindow = document.getElementById('log-window')
var debriefInstructions = document.getElementById('debrief-instructions')

function toggleRestoreFS() {
    console.log('toogled restore root fs')
}
function openSettings() {
    console.log('open settings')
}
function transitionState(state) {
    setAllStatesInvisible()
    if (state == 0) {
        console.log('transition main page')
        stateReady.style = ''
        preflightInstructions.style = ''
    }
    if (state == 1) {
        console.log('transition in progress')
        statePrgress.style = ''
        logWindow.style = ''
    }
}
function logUI(msg) {
    logWindow.innerHTML += `[+] ${msg}<br>`
}


function setAllStatesInvisible() {
    stateReady.style = "display: none;"
    statePrgress.style = "display: none;"
    stateDone.style = "display: none;"
    preflightInstructions.style = "display: none;"
    logWindow.style = "display: none;"
    //debriefInstructions.style  = "display: none;"
}