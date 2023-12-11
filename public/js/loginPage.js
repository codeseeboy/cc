function goToHomePage() {
  window.location.href = '/index';
}

const password2 = document.getElementById('Spassword');
const toggler2 = document.getElementById('toggler2');

showHidePassword2 = () => {
  if (password2.type === 'password') {
    password2.type = 'text';
    toggler2.classList.remove('uil-eye');
    toggler2.classList.add('uil-eye-slash');
  } else {
    password2.type = 'password';
    toggler2.classList.remove('uil-eye-slash');
    toggler2.classList.add('uil-eye');
  }
};


//
function seenoti(){
  
  document.getElementById('notify').style.display = 'block';

}

document.getElementById('noticlick').addEventListener('click', seenoti);
