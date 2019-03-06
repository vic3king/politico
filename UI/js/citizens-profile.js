/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
const modalOffice = document.getElementById('myModal-office');
const btn = document.getElementById('results');
const modal = document.querySelector('#votemodal');
const petitionForm = document.getElementById('petitions-form');
const petitionComment = document.getElementById('comments');
const petitionEvidenceUrl = document.getElementById('evidence');
const selectOffice = document.getElementById('select-office');
const petitionErrors = document.getElementById('petition-errors');
const feedback = document.getElementById('votes-feedback');

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
<button id="lgc" key="${office.id}" class="veiwrecord vote1">View</button>
</div>`;
let officeid;
let candidateid;
function getCandidates() {
  const viewCandidatesButton = document.querySelectorAll('.veiwrecord');
  viewCandidatesButton.forEach((button) => {
    button.onclick = (e) => {
      modal.style.display = 'block';
      officeid = e.target.attributes.key.value;
      fetch(`${currApiEndpoint}/candidates/${officeid}`, getOfficesConfig)
        .then(resp => resp.json())
        .then((resp) => {
          const { error, data } = resp;
          if (error) {
            console.log(error);
          }
          let outputx = '';
          data.forEach((candidate) => {
            candidateid = candidate.id;
            outputx += `
            <div>
            <div class="flex accordion2">
              <div class="profile__image__candidates"></div>
              <p style="text-align: left">
                Candidate: ${candidate.firstname} ${candidate.lastname}<br>
                Party: ${candidate.partyname}<br>
                Position: ${candidate.officename}
              </p>
              <button id="results" onclick="voteCandidate()">Vote</button>
            </div>
          </div>`;
          });
          const section = document.querySelector('.candidates');
          section.innerHTML = outputx;
        });
    };
  });
}


function voteCandidate() {
  const office = Number(officeid);
  const candidate = Number(candidateid);
  const formData = {
    office,
    candidate,
  };

  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': politicoToken,
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/votes`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error, data } = resp;
      if (error) {
        if (error.message) {
          feedback.innerHTML = error.message;
          feedback.style.display = 'block';
          feedback.style.color = 'red';
          feedback.style.border = '1px solid red';
        }
      }

      if (data) {
        feedback.innerHTML = resp.message;
        feedback.style.display = 'block';
        feedback.style.color = 'green';
        feedback.style.border = '2px solid green';
      }
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 5000);
    })
    .catch(err => console.log(err));
}

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

    getCandidates();
  });

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
