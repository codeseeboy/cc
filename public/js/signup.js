const password = document.getElementById('Lpassword');

const toggler = document.getElementById('toggler');



showHidePassword = () => {
  if (password.type === 'password') {
    password.type = 'text';
    toggler.classList.add('uil-eye-slash');
  
  } else {
    password.type = 'password';
    toggler.classList.remove('uil-eye-slash');
   
  }
};

toggler.addEventListener('click', showHidePassword);

function goToHomePage() {
    window.location.href = '/index';
  }
  