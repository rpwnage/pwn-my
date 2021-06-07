var stateReady   = document.getElementById('state-ready')
var statePrgress = document.getElementById('state-inprogress')
var stateDone    = document.getElementById('state-done')

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
    }
    if (state == 1) {
        console.log('transition in progress')
        statePrgress.style = ''
    }
}

function setAllStatesInvisible() {
    stateReady.style = "display: none;"
    statePrgress.style = "display: none;"
    stateDone.style = "display: none;"
}