document.getElementById('addparty').addEventListener('click', () => {
  console.log('test')
  document.querySelector('.red-flag').style.display = 'block';
  document.querySelector('.red-flag1').style.display = 'none';
})

document.getElementById('addoffice').addEventListener('click', () => {
  console.log('test')
  document.querySelector('.red-flag1').style.display = 'block';
  document.querySelector('.red-flag').style.display = 'none';
})
