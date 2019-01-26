const modal2 = document.getElementById('myEditModal');
const updateForm = document.querySelector('.update-accord');

updateForm.onclick = () => {
  modal2.style.display = 'block';
};

// btn11.onclick = function () {
//   modal.style.display = 'none';
// };

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
  const senateHouse = document.querySelector('#senate-house');

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
  houseReps.addEventListener('click', displayForm1);
  senateHouse.addEventListener('click', displayForm1);
}

// Get the modal
const modal = document.getElementById('myModal');
const btn1 = document.getElementById('modalno');
const btn2 = document.getElementById('modalyes');
// Get the button that opens the modal
const btn = document.getElementById('myBtn');

// When the user clicks the button, open the modal
btn.onclick = () => {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
btn1.onclick = () => {
  modal.style.display = 'none';
};

btn2.onclick = () => {
  document.getElementById('del-test').style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  } else if (event.target === modal2) {
    modal2.style.display = 'none';
  }
};

dislayRedForm();
