/* eslint-disable no-unused-expressions */

const btn = document.getElementById('results');
const modalOffice = document.getElementById('myModal-office');
const petitionForm = document.getElementById('petitions-form');
const petitionComment = document.getElementById('comments');
const petitionEvidenceUrl = document.getElementById('evidence');
const selectOffice = document.getElementById('select-office');
const petitionErrors = document.getElementById('petition-errors');
const declearInterestForm = document.getElementById('declare-interest-form');
const selectInterestOffice = document.getElementById('declear-office');
const selectInterestParty = document.getElementById('declear-party');
const selectAge = document.getElementById('age');
const interestFeedback = document.getElementById('interest-errors');
// eslint-disable-next-line func-names
btn.onclick = function () {
  modalOffice.style.display = 'block';
};


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

const currApiEndpoint = 'https://radiant-retreat-64120.herokuapp.com/api/v1';

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
<button class="veiwrecord" onclick="dislayRedForm()">Declare interest</button>
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

    // petitions
    data.forEach((officedata) => {
      const selectEl = document.querySelector('#select-office');
      const option = document.createElement('option');

      option.value = `${officedata.id}`;
      option.innerHTML = `${officedata.name}`;
      selectEl.appendChild(option);
    });


    const div = document.querySelector('#grid');
    div.innerHTML = output;
  });

const modal = document.querySelector('#form-modal');
// eslint-disable-next-line no-unused-vars
function dislayRedForm() {
  modal.style.display = 'block';
}

petitionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {};

  if (selectOffice.value) {
    formData.office = Number(selectOffice.value);
  }
  if (petitionComment.value) {
    formData.comment = petitionComment.value;
  }
  if (petitionEvidenceUrl.value) {
    formData.evidence = petitionEvidenceUrl.value;
  }
  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': politicoToken,
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/petitions`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error, data } = resp;
      if (error) {
        if (error.message) {
          petitionErrors.innerHTML = error.message;
          petitionErrors.style.color = 'red';
        }
      }

      if (data) {
        console.log(data);
      }
    })
    .catch(err => console.log(err));
});

// declear interest to run for office;
fetch(`${currApiEndpoint}/offices`, getOfficesConfig)
  .then(resp => resp.json())
  .then((resp) => {
    const { error, data } = resp;
    if (error) {
      console.log(error);
    }

    data.forEach((officedata) => {
      const selectEl = document.querySelector('#declear-office');
      const option = document.createElement('option');

      option.value = `${officedata.id}`;
      option.innerHTML = `${officedata.name}`;
      selectEl.appendChild(option);
    });
  });

fetch(`${currApiEndpoint}/parties`, getOfficesConfig)
  .then(resp => resp.json())
  .then((resp) => {
    const { error, data } = resp;
    if (error) {
      console.log(error);
    }

    data.forEach((partydata) => {
      const selectEl = document.querySelector('#declear-party');
      const option = document.createElement('option');

      option.value = `${partydata.id}`;
      option.innerHTML = `${partydata.name}`;
      selectEl.appendChild(option);
    });
  });

declearInterestForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {};

  if (selectInterestOffice.value) {
    formData.office = Number(selectInterestOffice.value);
  }
  if (selectInterestParty.value) {
    formData.party = Number(selectInterestParty.value);
  }
  if (selectAge.value) {
    formData.ageLimit = Number(selectAge.value);
  }
  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': politicoToken,
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/office/${user.id}/register`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error, data } = resp;
      if (error) {
        console.log(error);
        if (error.message) {
          interestFeedback.innerHTML = error.message;
          interestFeedback.style.color = 'red';
        }
      }

      if (data) {
        console.log(data);
        interestFeedback.innerHTML = resp.message;
        interestFeedback.style.color = 'green';
      }
    })
    .catch(err => console.log(err));
});

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }

  if (event.target === modalOffice) {
    modalOffice.style.display = 'none';
  }
};
