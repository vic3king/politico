/* eslint-disable no-unused-expressions */
const invalidToken = () => {
  window.location = './login.html';
};

const { politicoUser, politicoToken } = localStorage;
if (!politicoToken) {
  invalidToken();
}

const logout = () => {
  localStorage.removeItem('politicoToken');
  window.location = './index.html';
};

document.getElementById('logout').addEventListener('click', logout);

const currApiEndpoint = 'radiant-retreat-64120.herokuapp.com/api/v1';

const setUpHeader = () => ({ 'x-access-token': politicoToken });

const getOfficesConfig = {
  headers: setUpHeader(),
};
const jsUcfirst = string => string.charAt(0).toUpperCase() + string.slice(1);

const user = JSON.parse(politicoUser);

const fullName = document.getElementById('fullname');
fullName.textContent = `Fullname: ${user.firstname} ${user.othernames} ${user.lastname}`;

const email = document.getElementById('email');
email.textContent = `Email: ${user.email}`;
const phoneNumber = document.getElementById('phonenumber');
phoneNumber.textContent = `Phone: ${user.phonenumber}`;
const type = document.getElementById('type');
type.textContent = `Status: ${user.type}`;

const displayDiv = office => `<div class="div1">
<h6>${jsUcfirst(office.name)}(${jsUcfirst(office.type)})</h6>
<p class="admin">0</p>
<button id="lgc" onclick="dislayRedForm()" class="veiwrecord vote1">View</button>
</div>`;

fetch(`${currApiEndpoint}/offices`, getOfficesConfig)
  .then(resp => resp.json())
  .then((resp) => {
    const { error, data } = resp;
    if (error) {
      console.log(error);
    }

    let output = '';
    data.forEach((office) => {
      output += displayDiv(office);
    });

    const div = document.querySelector('#grid');
    div.innerHTML = output;
  });

const modal = document.querySelector('#votemodal');
// eslint-disable-next-line no-unused-vars
function dislayRedForm() {
  modal.style.display = 'block';
}

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
