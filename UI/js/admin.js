// Get the modal
const modalOffice = document.getElementById('myModal-office');
const modalParty = document.getElementById('myModal-party');

// const modalx = document.querySelector('.modal');

// Get the button that opens the modal
const btn = document.getElementById('office-modal');
const btn2 = document.getElementById('party-modal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modalOffice.style.display = 'block';
};

btn2.onclick = function () {
  modalParty.style.display = 'block';
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modalOffice.style.display = 'none';
};

