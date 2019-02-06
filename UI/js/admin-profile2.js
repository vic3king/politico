/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
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

const currApiEndpoint = 'http://127.0.0.1:3000/api/v1';

const setUpHeader = () => ({ 'x-access-token': politicoToken });

const getOfficesConfig = {
  headers: setUpHeader(),
};

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

// const displayDiv2 = (party) => {
//   console.log(party.id);
//   return `<div class="div1 vote party">
// <div class="party__image2"></div>
// <div class="party__details">
//   <div><b>Party</b>: ${party.name}</div>
//   <div><b>Members</b>: 00</div>
//   <div><b>Hq address</b>: ${party.hqaddress}</div>
//   <button id="edit-name" class="edit-btn" onclick="updateModal()">Edit</button>
//   <button class="delete-record">Delete</button>
//   </div>
// </div>
// <div id="myEditModal" class="modal">
// <section class="modal-content-edit">
//   <form style="color: white">
//       <h3 class="page-title3">Update Party Details:</h3>
//         <label for="title">Name: </label>
//         <input type="text" placeholder="Update your party name?" name="name" required>
//           <button type="submit" id="party-name" onclick="handleUpdates(${party.id})">Update</button>
//     </div>
//   </form>
// </section>
// </div>
// `;
// };
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
    button.onclick = () => {
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
      const { id, name, hqaddress } = party;
      output += `<div class="div1 vote party">
      <div class="party__image2"></div>
      <div class="party__details">
        <div><b>Party</b>: ${name}</div>
        <div><b>Members</b>: 00</div>
        <div><b>Hq address</b>: ${hqaddress}</div>
        <button id="edit-name" class="edit-btn" onclick="">Edit</button>
        <button class="delete-record">Delete</button>
        </div>
      </div>
      <div id="myEditModal" class="modal">
      <section class="modal-content-edit">
        <form style="color: white">
            <h3 class="page-title3">Update Party Details:</h3>
              <label for="title">Name: </label>
              <input type="text" id="party-name" placeholder="Update your party name?" required>
                <button type="submit" class="update-btn" onclick="handleUpdates(event, ${id})">Update</button>
          </div>
        </form>
      </section>
      </div>
      <div id="myModal" class="modal1">
            <section class="modal-content">
              <p>Are you sure you want to delete?</p>
              <button id="modalyes" onclick="handleDelete(${id})" class="modalbtn">Yes</button>
              <button id="modalno" class="modalbtn2">No</button>
            </section>
           </div> 
      `;
    });

    const div = document.querySelector('#grid2');
    div.innerHTML = output;

    updateModal();
  });

function handleDelete(id) {
  const fetchConfig = {
    method: 'DELETE',
    headers: setUpHeader(),
  };
  fetch(`${currApiEndpoint}/parties/${id}`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      console.log(resp);
      window.location = './admin-profile.html';
    });
}

function handleUpdates(event, id) {
  event.preventDefault();
  const partyNameEl = document.getElementById('party-name');
  const formData = {};
  if (partyNameEl.value) {
    formData.name = partyNameEl.value;
  }
  console.log(id);

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
      console.log(resp);
      // window.location = './profile.html';
    }).catch(err => console.log(err));
}
