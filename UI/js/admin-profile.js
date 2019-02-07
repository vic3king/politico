/* eslint-disable no-unused-expressions */

const partyForm = document.getElementById('party-form');
const partyName = document.getElementById('name');
const partyAddress = document.getElementById('search_term');
const partyLogoUrl = document.getElementById('image');
const spanName = document.getElementById('spanname');
const spanAddress = document.getElementById('spanaddress');
const spanLogo = document.getElementById('spanlogo');
const officeType = document.getElementById('selecttype');
const officeName = document.getElementById('officename');
const officeAge = document.getElementById('age');
const spanOfficeName = document.getElementById('spanofficename');
const spanAge = document.getElementById('spanage');
const officeForm = document.getElementById('office-form');


const { politicoToken } = localStorage;

const currApiEndpoint = 'radiant-retreat-64120.herokuapp.com/api/v1';

officeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {};
  if (officeType.value === 'federal' || officeType.value === 'state' || officeType.value === 'legislative' || officeType.value === 'local-government') {
    formData.type = officeType.value;
  }
  if (officeAge.value) {
    formData.ageLimit = officeAge.value;
  }
  if (officeName.value) {
    formData.name = officeName.value;
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
  fetch(`${currApiEndpoint}/offices`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error, data } = resp;
      if (error) {
        if (error.message) {
          spanOfficeName.innerHTML = error.message;
          spanOfficeName.style.color = 'red';
        }
        if (error.agemessage) {
          spanAge.innerHTML = error.agemessage;
          spanAge.style.color = 'red';
        }

        if (error.duplicate) {
          spanOfficeName.innerHTML = error.duplicate;
          spanOfficeName.style.color = 'red';
        }
      }
      if (data) {
        window.location = './admin-profile.html';
      }
    })
    .catch(err => console.log(err));
});
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
