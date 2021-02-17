

const hamburgerButton = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('.navbar');
const logo = document.querySelector('.navbar-brand>img');
const menuItems = document.querySelector('.nav')
const dropdown = document.querySelector('.navbar-collapse');

let scrollY = 0;
let innerH = 0;
let url;
try{
let expanded = hamburgerButton.getAttribute('aria-expanded'); // to be set on loading page
} catch{}
//window.addEventListener('load', (event) => { //waits when all e.g images are loaded/ menu items where visible for a second after refreshing page
document.addEventListener("DOMContentLoaded", function(event) { //fired when document ready, but not all is loaded so it is done earlier
  url = window.location.pathname;
  console.log(url);
  if(url.includes('testapp/realization')){
      menuItems.classList.add('d-none');
  }
});



//---------navbar behavior
const menuDisplay = ()=>{
  //----on scroll change navbar theme
  window.addEventListener('scroll', _.throttle(()=>{
    innerH = window.innerHeight;
    scrollY = window.scrollY;
    expanded = hamburgerButton.getAttribute('aria-expanded'); // check attrbiute when scroll

    console.log(innerH, scrollY, expanded);

    if(expanded =="false"){
     if(scrollY < innerH/2){
       changeToLightMenu();
     } else {
       changeToDarkMenu();
     }
   }
    //
    // if(!expanded){
    //   changeToDarkMenu();
    // }

  },200));

  //----on toggler button click (screen smaller than md) change navbar theme when collapse
  hamburgerButton.addEventListener('click',()=>{
    if(scrollY<=innerH/2){
      expanded = hamburgerButton.getAttribute('aria-expanded'); //check attribiute on click
      if(expanded == "true"){
        changeToLightMenu();
      }else{
        changeToDarkMenu();
      }
    }
  });

  document.addEventListener('click', event => {
    if (!navbarMenu.contains(event.target)) { //when click outside the navbarMenu
       dropdown.classList.remove('show');
       hamburgerButton.classList.add('collapsed');
       hamburgerButton.setAttribute("aria-expanded", false);
     }
  }); //easy trick to close dropdown menu

}

//--------chaning themes of navbarMenu
const changeToLightMenu = function(){
  navbarMenu.classList.remove('navbar-dark','bg-dark');
  navbarMenu.classList.add('navbar-light');
  logo.src = "/images/logo-dark.svg";
}

const changeToDarkMenu = function(){
  navbarMenu.classList.remove('navbar-light');
  navbarMenu.classList.add('navbar-dark','bg-dark');
  logo.src = "/images/logo-light.svg";
}



module.exports = {
    menuDisplay: menuDisplay
};
