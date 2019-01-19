//  accordion to render list of red flags
const accordion = document.getElementsByClassName('accordion');
// const candidates = document.getElementsByClassName('vote1')

for (let i = 0; i < accordion.length; i += 1) {
  accordion[i].addEventListener('click', function toggle() {
    //  classlist is used to access the class instead of using its direct classs name
    this.classList.toggle('active');
    //  this is is selecting the
    // div
    const panel = this.nextElementSibling;
    //  div is hidden in css, conditional to display or hide it
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}

// for (let i = 0; i < candidates.length; i += 1) {
//   candidates[i].addEventListener('click', () => {
//     console.log('testing')
//   let disp = document.querySelector('.candidates')
//   disp.style.display = 'block'
//   });
// }

// reusable conditional statement
const conditional = (e, btnId, elClass, state) => {
  // the div wont have an id of btn1, so js will check the next element which will be the button
  if (e.target.id === btnId) {
  // effect to make sure only one form is being displayed at a time
    document.querySelector(elClass).style.display = state;
  } else {
    document.querySelector(elClass).style.display = 'none';
  }
};

function dislayRedForm() {
  const lgc = document.querySelector('#lgc');
  const houseReps = document.querySelector('#house-of-reps');
  const senateHouse= document.querySelector('#senate-house');

  function displayForm1(e) {
    // conditional logic function
    conditional(e, 'lgc', '.candidates', 'block');
    e.stopPropagation();
    conditional(e, 'house-of-reps', '.candidates1', 'block');
    e.stopPropagation();
    conditional(e, 'senate-house', '.candidates2', 'block');
    e.stopPropagation();
  }
  // event listeners placed on divs
  lgc.addEventListener('click', displayForm1);
  houseReps.addEventListener('click', displayForm1);
  senateHouse.addEventListener('click', displayForm1);

}

dislayRedForm();
