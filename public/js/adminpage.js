// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");
const pres = document.getElementById('prescription');

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
 
// function gopresPage() {
//   document.getElementById('allapp').style.display = 'block';
//   document.getElementById('add').style.display = 'none';
 
//   document.getElementById('dash1').style.display = 'none';
// }
// document.getElementById('app').addEventListener('click', gopresPage);

// function gotopat(){
  
//   document.getElementById('customer').style.display = 'block';
//   document.getElementById('prescription').style.display ='none';
// }

// document.getElementById('patient').addEventListener('click', gotopat);

// function  seepatient(){
//   document.getElementById('add').style.display = 'block';
//   document.getElementById('dash1').style.display = 'none';
//   document.getElementById('allapp').style.display = 'none';
// }
// document.getElementById('patient').addEventListener('click',seepatient);

// function  gotodash(){
//   document.getElementById('dash1').style.display = 'block';
//   document.getElementById('allapp').style.display = 'none';
//   document.getElementById('add').style.display = 'none';
 
// }
document.getElementById('dash').addEventListener('click',gotodash);
function goadmin() {
  window.location.href = '/admin';
}
