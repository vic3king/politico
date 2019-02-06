const logInForm = document.getElementById('login-form');
const logInEmail = document.getElementById('email');
const logInPassword = document.getElementById('password');
const spanEmail = document.getElementById('spanemail');
const spanUser = document.getElementById('spanuser');

// const currApiEndpoint = 'http://127.0.0.1:3000/api/v1';
const currApiEndpoint = 'https://radiant-retreat-64120.herokuapp.com/api/v1';

logInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {};

  if (logInEmail.value) {
    formData.email = logInEmail.value;
  }
  if (logInPassword.value) {
    formData.password = logInPassword.value;
  }

  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/auth/login`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error, data } = resp;
      if (error) {
        if (error.email) {
          spanEmail.innerHTML = error.email;
          spanEmail.style.color = 'red';
        }
        if (error.message) {
          spanUser.innerHTML = error.message;
          spanUser.style.color = 'red';
        }
      }
      if (data) {
        const { user, token } = data[0];
        localStorage.iUser = JSON.stringify(user);
        localStorage.iToken = token;
        if (user.type === 'admin') {
          window.location = './admin-profile.html';
        } else if (user.type === 'politician') {
          window.location = './politicians.html';
        } else {
          window.location = './citizens.html';
        }
      }
    })
    .catch(err => console.log(err));
});
