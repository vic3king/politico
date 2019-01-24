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

  function displayForm1(e) {
    // conditional logic function
    conditional(e, 'lgc', '.candidates', 'flex');
    e.stopPropagation();
    // conditional(e, 'house-of-reps', '.candidates1', 'flex');
    // e.stopPropagation();
    // conditional(e, 'senate-house', '.candidates2', 'flex');
    // e.stopPropagation();
  }
  // event listeners placed on divs
  lgc.addEventListener('click', displayForm1);

}

dislayRedForm()