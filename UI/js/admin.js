// Get the modal
const modalOffice = document.getElementById('myModal-office');
const modalParty = document.getElementById('myModal-party');

// Get the button that opens the modal
const btn = document.getElementById('office-modal');
const btn2 = document.getElementById('party-modal');

// When the user clicks the button, open the modal
btn.onclick = function () {
  modalOffice.style.display = 'block';
};

btn2.onclick = function () {
  modalParty.style.display = 'block';
};
