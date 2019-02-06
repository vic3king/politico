document.getElementById('btn1').addEventListener('click', () => {
  document.querySelector('.red-flag').style.display = 'block';
  document.querySelector('.red-flag1').style.display = 'none';
});

document.getElementById('btn2').addEventListener('click', () => {
  document.querySelector('.red-flag1').style.display = 'block';
  document.querySelector('.red-flag').style.display = 'none';
});
