const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]')
}
let timerId = null
let started = 0
// check()

refs.btnStart.addEventListener('click', ()=> {
    console.log('start');
    timerId = setInterval(()=>{
        document.body.style.backgroundColor = getRandomHexColor()
    }, 1000)
    refs.btnStart.setAttribute('disabled', 'true')
    // started = true
})

refs.btnStop.addEventListener('click', ()=>{
    clearInterval(timerId)
    console.log('stop');
    refs.btnStart.removeAttribute('disabled')
    // started = false
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// function check () {
//     if (started) {
//         refs.btnStart.setAttribute('disabled', 'true')
//     }    
// }

