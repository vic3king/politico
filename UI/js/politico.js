const runForOfficeButton = document.getElementById('run-for-office')
const displayOpenPositions = document.getElementById('open-positions')
const declareButtonDispForm = document.getElementsByClassName('veiwrecord');
const declare = document.getElementsByClassName('button-declare')


runForOfficeButton.addEventListener('click', () => {
  console.log('test')
  displayOpenPositions.style.display = 'block'
})

for (let i = 0; i < declareButtonDispForm.length; i += 1) {
  declareButtonDispForm[i].addEventListener('click', () => {
    console.log('testing')
  let disp = document.querySelector('.form-section')
  disp.style.display = 'block'
  });
}
