import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', submitForm);

function submitForm(event) {

  event.preventDefault();

  const firstDelay = Number(document.getElementsByName('delay')[0].value);
  const stepDelay = Number(document.getElementsByName('step')[0].value);
  const amountEl = document.getElementsByName('amount')[0].value;

  for (let i = 0; i < amountEl; i += 1) {
    let position = i + 1;
    let delay = firstDelay + stepDelay * i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        // Notiflix.Notify.closeButton = true
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
  // event.target.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
