/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
const invalidToken = () => {
  window.location = './login.html';
};

const { politicoToken } = localStorage;
if (!politicoToken) {
  invalidToken();
}

const logout = () => {
  localStorage.removeItem('politicoToken');
  window.location = './index.html';
};

document.getElementById('logout').addEventListener('click', logout);
const jsUcfirst = string => string.charAt(0).toUpperCase() + string.slice(1);
const modal = document.querySelector('#votemodal');
const currApiEndpoint = 'https://radiant-retreat-64120.herokuapp.com/api/v1';

const fetchConfig = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'x-access-token': politicoToken,
  },
};
fetch(`${currApiEndpoint}/offices`, fetchConfig)
  .then(resp => resp.json())
  .then((resp) => {
    const { error, data } = resp;
    if (error) {
      console.log(error);
    }

    if (data) {
      let output = '';
      data.forEach((office) => {
        const { id, name } = office;
        output += ` <div class="div1 vote">
        <h6>${jsUcfirst(name)}</h6>
        <p class="admin">0</p>
        <button id="view-results" onclick="results()" key="${id}" class="veiwrecord vote1">View Result</button>
      </div>`;
        const divContainer = document.querySelector('.container2');
        divContainer.innerHTML = output;
      });
    }
    results();
  })
  .catch(err => console.log(err));

let id;
function results() {
  const resultsButton = document.querySelectorAll('#view-results');
  resultsButton.forEach((button) => {
    button.onclick = (e) => {
      modal.style.display = 'block';
      id = e.target.attributes.key.value;
      fetch(`${currApiEndpoint}/office/${id}/result`, fetchConfig)
        .then(resp => resp.json())
        .then((resp) => {
          const { error, data } = resp;
          if (error) {
            console.log(error);
          }

          let output = '';
          data.forEach((result) => {
            const {
              party, firstname, lastname, results,
            } = result;
            output += `
            <div>
               <div class="flex accordion2">
                 <div class="profile__image__candidates"></div>
                 <p style="text-align: left">
                 <h6>Party: ${jsUcfirst(party)}</h6>
                 <h6>Candidate: ${jsUcfirst(firstname)} ${jsUcfirst(lastname)}</h6>
                 <p>Total Number of Votes <br><b>${results}</b></p>
                  </div>
                  </div>`;
          });
          const divContainer = document.querySelector('.candidates');
          divContainer.innerHTML = output;
        })
        .catch(err => console.log(err));
    };
  });
}
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};
