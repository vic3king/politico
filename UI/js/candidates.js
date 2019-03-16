/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
const modal3 = document.getElementById('myModal-office');
const modal2 = document.getElementById('myModal-party');
const modalx = document.querySelector('.modal');
const { politicoToken } = localStorage;
const setUpHeader = () => ({ 'x-access-token': politicoToken });

const invalidToken = () => {
  window.location = './login.html';
};


if (!politicoToken) {
  invalidToken();
}

const getOfficesConfig = {
  headers: setUpHeader(),
};

let id;
function updateModal() {
  const modal = document.querySelector('.modal');
  const modal1 = document.querySelector('.modal1');

  // const modalNo = document.querySelectorAll('#modalno');
  const updateForm = document.querySelectorAll('.approve-btn');
  const deleteBtn = document.querySelectorAll('.reject-btn');
  // modalNo.forEach((button) => {
  //   button.onclick = () => {
  //     modal1.style.display = 'none';
  //   };
  // });
  deleteBtn.forEach((button) => {
    button.onclick = (e) => {
      modal1.style.display = 'block';
      id = e.target.attributes.key.value;
    };
  });
  updateForm.forEach((button) => {
    button.onclick = (event) => {
      id = event.target.attributes.key.value;
      handleUpdates(event, 'approved');
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
    }
  };
}
// 'https://radiant-retreat-64120.herokuapp.com/api/v1'
const currApiEndpoint = 'http://127.0.0.1:3000/api/v1';

fetch(`${currApiEndpoint}/candidates`, getOfficesConfig)
  .then(resp => resp.json())
  .then((resp) => {
    console.log(resp);
    const { error, data } = resp;
    if (error) {
      console.log(error);
    }
    let output = '';
    data.forEach((candidate) => {
      output += `<div class="div1 vote candidate">
      <div class="profile__image__candidates"></div>
      <div class="party__details">
        <div><b>Fullname</b>: ${candidate.name}</div>
        <div><b>Status</b>: ${candidate.status}</div>
        <button id="edit-name" class="approve-btn" key="${candidate.id}">Approve</button>
        <button class="reject-btn" key="${candidate.id}">Reject</button>
        </div>
      </div>
      <div id="myEditModal" class="modal">
      <section class="modal-content-edit">
       <div class="box2">
       <form style="color: white">
       <h3 class="page-title3">Update Party Details:</h3><span id="spanname"></span>
         <input type="text" id="party-name" required>
           <button type="submit" class="update-btn" onclick="handleUpdates(event, 'approved')">Update</button>
     </div>
   </form>
   </div>
      </section>
      </div>
      <div id="myModal" class="modal1">
            <section class="modal-content">
              <p>Are you sure you want to reject this Candidate?</p>
              <button id="modalno" onclick="handleUpdates(event, 'rejected')" class="modalbtn">Yes</button>
              <button id="modalno" class="modalbtn2">No</button>
            </section>
           </div> 
      `;
    });

    const div = document.querySelector('#grid3');
    div.innerHTML = output;

    updateModal();
  });

function handleUpdates(event, status) {
  event.preventDefault();
  const spanInput = document.getElementById('spanname');
  const formData = {};
  formData.status = status;
  console.log('update');
  const fetchConfig = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': politicoToken,
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/candidates/${id}/status`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      console.log(resp);
      const { error, data } = resp;
      if (error) {
        if (error.message) {
          spanInput.innerHTML = error.message;
          spanInput.style.color = 'red';
        }
      }
      if (data) {
        window.location = './candidates.html';
      }
    }).catch(err => console.log(err));
}
