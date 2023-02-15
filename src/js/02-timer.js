import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const customerInputEl = document.getElementById('datetime-picker');

const startBtnEl = document.querySelector('button[data-start]');

const dayEl = document.querySelector('span[data-days]');
const hourEl = document.querySelector('span[data-hours]');
const minEl = document.querySelector('span[data-minutes]');
const secEl = document.querySelector('span[data-seconds]');

startBtnEl.disabled = true;

let ms = null;
let selectedDate = null;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    ms = selectedDate - options.defaultDate;

    if (ms < 0) {
      Report.warning('Please choose a date in the future');
    } else startBtnEl.disabled = false;

    return;
  },
};

flatpickr(customerInputEl, options);

startBtnEl.addEventListener('click', startTimer);

function convertMs(ms) {
  ms = selectedDate - Date.now();

  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  dayEl.textContent = addZero(Math.floor(ms / day));
  // Remaining hours
  hourEl.textContent = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  minEl.textContent = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  secEl.textContent = addZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  if (ms < 1000) {
    customerInputEl.disabled = false;
    Notify.success('Time is up!');
    clearInterval(intervalId);
  }
}

function startTimer() {
  
  intervalId = setInterval(convertMs, 1000);

  customerInputEl.disabled = true;
  startBtnEl.disabled = true;
}

function addZero(number) {
  return String(number).padStart(2, 0);
}
