/* eslint-disable no-unused-vars */
const runForOfficeButton = document.getElementById('run-for-office');
const displayOpenPositions = document.getElementById('open-positions');
const declareButtonDispForm = document.getElementsByClassName('veiwrecord');
const declare = document.getElementsByClassName('button-declare');


for (let i = 0; i < declareButtonDispForm.length; i += 1) {
  declareButtonDispForm[i].addEventListener('click', () => {
    console.log('testing');
    const disp = document.querySelector('.form-section');
    disp.style.display = 'block';
  });
}
