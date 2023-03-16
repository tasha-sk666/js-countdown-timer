'use strict'

let countdown; // for clear setInterval
const timerDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll('[data-time]')
const form = document.querySelector(".form")

const audioStart = new Audio()
audioStart.preload = 'auto';
audioStart.src = './audio/starttimer.mp3'

const audioEnd = new Audio()
audioEnd.preload = 'auto';
audioEnd.src = './audio/endtimer.mp3'

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes < 10 ? "0" : ''}${minutes} : ${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  console.log('timestanp' + timestamp)
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();

  endTimeDisplay.textContent = `Be Back at ${hours} : ${minutes < 10 ? '0' : ''}${minutes}`;
}

function timer(seconds) {
  clearInterval(countdown)
  audioStart.play()

  const now = Date.now();
  const then = now + (seconds * 1000);

  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if (secondsLeft < 0) {
      audioEnd.play()
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// timer(4)

function startTimer() {
  const seconds = parseInt(this.dataset.time)
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener('click', startTimer))
form.addEventListener('submit', function (e) {
  e.preventDefault()

  const mins = this.minutes.value

  timer(mins * 60)
  this.reset()
})


