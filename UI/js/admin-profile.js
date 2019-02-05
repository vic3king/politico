/* eslint-disable no-unused-expressions */

const partyForm = document.getElementById('party-form');
const partyName = document.getElementById('name');
const partyAddress = document.getElementById('search_term');
const partyLogoUrl = document.getElementById('image');
const spanName = document.getElementById('spanname');
const spanAddress = document.getElementById('spanaddress');
const spanLogo = document.getElementById('spanlogo');

const invalidToken = () => {
  window.location = './login.html';
};

const { politicoToken } = localStorage;
if (!politicoToken) {
  invalidToken();
}
const currApiEndpoint = 'http://127.0.0.1:3000/api/v1';

// eslint-disable-next-line consistent-return
partyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {};
  if (partyName.value) {
    formData.name = partyName.value;
  }
  if (partyAddress.value) {
    formData.hqAddress = partyAddress.value;
  }
  if (partyLogoUrl.value) {
    formData.logoUrl = partyLogoUrl.value;
  }

  // checks if input contains only letters
  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  if (hasNumber(partyName.value)) {
    spanName.innerHTML = ' ** name can only contain letters';
    spanName.style.color = 'red';
    return false;
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
  fetch(`${currApiEndpoint}/parties`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error, data } = resp;
      if (error) {
        if (error.message) {
          spanLogo.innerHTML = error.message;
          spanLogo.style.color = 'red';
        }

        if (error.err) {
          spanAddress.innerHTML = '  ** please enter a valid address';
          spanAddress.style.color = 'red';
        }
      }
      if (data) {
        window.location = './admin-profile.html';
      }
    })
    .catch(err => console.log(err));
});
