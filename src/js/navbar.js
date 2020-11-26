

const hamburgerButton = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('.navbar');
const logo = document.querySelector('.navbar-brand>img');
let expanded;
let scrollY;
let innerH;


//---------navbar behavior
const menuDisplay = ()=>{
  //----on scroll change navbar theme
  window.addEventListener('scroll', _.throttle(()=>{
    innerH = window.innerHeight;
    scrollY = window.scrollY;

    console.log(innerH, scrollY);

    if(scrollY > innerH/2){
      changeToDarkMenu();
    } else {
      changeToLightMenu();
    }
  },200));

  //----on toggler button click (screen smaller than md) change navbar theme when collapse
  hamburgerButton.addEventListener('click',()=>{
    if(scrollY<innerH/2){
      expanded = hamburgerButton.getAttribute('aria-expanded');
      if(expanded == "true"){
        changeToLightMenu();
      }else{
        changeToDarkMenu();
      }
    }
  });

}

//--------chaning themes of navbarMenu
const changeToLightMenu = function(){
  navbarMenu.classList.remove('navbar-dark','bg-dark');
  navbarMenu.classList.add('navbar-light');
  logo.src = "images/logo-dark.svg";
}

const changeToDarkMenu = function(){
  navbarMenu.classList.remove('navbar-light');
  navbarMenu.classList.add('navbar-dark','bg-dark');
  logo.src = "images/logo-light.svg";
}

module.exports = {
    menuDisplay: menuDisplay
};
