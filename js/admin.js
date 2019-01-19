const accordion = document.getElementsByClassName('accordion');

const updateAccord = document.getElementsByClassName('update-accord');

for (let i = 0; i < accordion.length; i += 1) {
  accordion[i].addEventListener('click', function toggle() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}


for (let i = 0; i < updateAccord.length; i += 1) {
  updateAccord[i].addEventListener('click', function toggle() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}