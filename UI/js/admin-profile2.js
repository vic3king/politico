/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
const modalx = document.querySelector('.modal');
const modal3 = document.getElementById('myModal-office');
const modal2 = document.getElementById('myModal-party');
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


function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
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
<button id="lgc" class="veiwrecord vote1">View</button>
</div>`;

let id;
function updateModal() {
  const modal = document.querySelector('.modal');
  const modal1 = document.querySelector('.modal1');

  const modalNo = document.querySelectorAll('#modalno');
  const updateForm = document.querySelectorAll('.edit-btn');
  const deleteBtn = document.querySelectorAll('.delete-record');
  modalNo.forEach((button) => {
    button.onclick = () => {
      modal1.style.display = 'none';
    };
  });
  deleteBtn.forEach((button) => {
    button.onclick = () => {
      modal1.style.display = 'block';
    };
  });
  updateForm.forEach((button) => {
    button.onclick = (e) => {
      id = e.target.attributes.key.value;
      modal.style.display = 'block';
    };
  });

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
    if (event.target === modal1) {
      modal1.style.display = 'none';
    }
    if (event.target === modal3) {
      modal3.style.display = 'none';
    }
    if (event.target === modal2) {
      modal2.style.display = 'none';
    }
    if (event.target === modalx) {
      modalx.style.display = 'none';
      //   }
    }
  };
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

    const div = document.querySelector('#grid');
    div.innerHTML = output;
  });

fetch(`${currApiEndpoint}/parties`, getOfficesConfig)
  .then(resp => resp.json())
  .then((resp) => {
    const { error, data } = resp;
    if (error) {
      console.log(error);
    }
    let output = '';
    data.forEach((party) => {
      output += `<div class="div1 vote party">
      <div ><img src="${party.logourl}" class="party__image2"></div>
      <div class="party__details">
        <div><b>Party</b>: ${party.name}</div>
        <div><b>Members</b>: 00</div>
        <div><b>Hq address</b>: ${party.hqaddress}</div>
        <button id="edit-name" class="edit-btn" key="${party.id}">Edit</button>
        <button class="delete-record">Delete</button>
        </div>
      </div>
      <div id="myEditModal" class="modal">
      <section class="modal-content-edit">
       <div class="box2">
       <form style="color: white">
       <h3 class="page-title3">Update Party Details:</h3><span id="spanname"></span>
         <input type="text" id="party-name" required>
           <button type="submit" class="update-btn" onclick="handleUpdates(event)">Update</button>
     </div>
   </form>
   </div>
      </section>
      </div>
      <div id="myModal" class="modal1">
            <section class="modal-content">
              <p>Are you sure you want to delete?</p>
              <button id="modalyes" onclick="handleDelete()" class="modalbtn">Yes</button>
              <button id="modalno" class="modalbtn2">No</button>
            </section>
           </div> 
      `;
    });

    const div = document.querySelector('#grid2');
    div.innerHTML = output;

    updateModal();
  });

function handleDelete() {
  const fetchConfig = {
    method: 'DELETE',
    headers: setUpHeader(),
  };
  fetch(`${currApiEndpoint}/parties/${id}`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      window.location = './admin-profile.html';
    });
}

function handleUpdates(event) {
  event.preventDefault();
  const partyNameEl = document.getElementById('party-name');
  const spanInput = document.getElementById('spanname');
  const formData = {};
  if (partyNameEl.value) {
    formData.name = partyNameEl.value;
  }

  const fetchConfig = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': politicoToken,
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/parties/${id}/name`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error, data } = resp;
      if (error) {
        if (error.message) {
          spanInput.innerHTML = error.message;
          spanInput.style.color = 'red';
        }
      }
      if (data) {
        window.location = './admin-profile.html';
      }
    }).catch(err => console.log(err));
}
