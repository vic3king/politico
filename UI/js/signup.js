const signUpForm = document.getElementById('signup-form');
const signUpFirstName = document.getElementById('firstname');
const signUpLastName = document.getElementById('lastname');
const signUpEmail = document.getElementById('email');
const signUpOthernames = document.getElementById('othernames');
const signUpPhoneNumber = document.getElementById('phonenumber');
const signUpPassword = document.getElementById('password');
const signUptype = document.getElementById('selecttype');
const spanEmail = document.getElementById('vemail');
const spanPhone = document.getElementById('phone');
const spanUser = document.getElementById('usergen');
const spanFirstName = document.getElementById('spanfirstname');
const spanLastName = document.getElementById('spanlastname');
const spanotherNames = document.getElementById('spanothernames');
const spanPass = document.getElementById('spanpass');


// const currApiEndpoint = 'http://127.0.0.1:3000/api/v1';
const currApiEndpoint = 'https://radiant-retreat-64120.herokuapp.com/api/v1';

// eslint-disable-next-line consistent-return
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {};
  if (signUpFirstName.value) {
    formData.firstname = signUpFirstName.value;
  }
  if (signUpLastName.value) {
    formData.lastname = signUpLastName.value;
  }
  if (signUpOthernames.value) {
    formData.othernames = signUpOthernames.value;
  }
  if (signUpEmail.value) {
    formData.email = signUpEmail.value;
  }
  if (signUpPhoneNumber.value) {
    formData.phonenumber = signUpPhoneNumber.value;
  }
  if (signUpPassword.value) {
    formData.password = signUpPassword.value;
  }
  if (signUptype.value === 'citizen' || signUptype.value === 'politician') {
    formData.type = signUptype.value;
  }

  // checks if input contains only letters
  function hasNumber(myString) {
    return /\d/.test(myString);
  }

  // checks if password is valid
  function isValidPass(s) {
    const re = /[a-z]\d|\d[a-z]/i;
    return re.test(s) && s.length > 3;
  }

  if (hasNumber(signUpFirstName.value)) {
    spanFirstName.innerHTML = '** firstname can only contain letters';
    spanFirstName.style.color = 'red';
    return false;
  }
  if (hasNumber(signUpLastName.value)) {
    spanLastName.innerHTML = '** firstname can only contain letters';
    spanLastName.style.color = 'red';
    return false;
  }
  if (hasNumber(signUpOthernames.value)) {
    spanotherNames.innerHTML = '** firstname can only contain letters';
    spanotherNames.style.color = 'red';
    return false;
  }
  if (!isValidPass(signUpPassword.value)) {
    spanPass.innerHTML = '** password should contain letters and numbers';
    spanPass.style.color = 'red';
    return false;
  }

  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/auth/signup`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error, data } = resp;
      if (error) {
        if (error.message) {
          spanEmail.innerHTML = error.message;
          spanEmail.style.color = 'red';
        }
        if (error.phone) {
          spanPhone.innerHTML = error.phone;
          spanPhone.style.color = 'red';
        }

        if (error.user) {
          spanUser.innerHTML = error.user;
          spanUser.style.color = 'red';
        }
      }

      if (data) {
        const { user, token } = data[0];
        localStorage.politicoUser = JSON.stringify(user);
        localStorage.politicoToken = token;
        window.location = './login.html';
      }
    })
    .catch(err => console.log(err));
});
