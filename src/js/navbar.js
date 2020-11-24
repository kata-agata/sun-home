// const toggleActive = () => {
//   const navItems = document.querySelectorAll('.nav-link');
//
//   // for(let i=0; i<navItems.length; i++){
//   //   navItems[i].addEventListener('click',()=>{
//   //     for(let j=0; j<navItems.length; j++){
//   //       navItems[j].classList.remove("active");
//   //     }
//   //     navItems[i].classList.add('active');
//   //   })
//   // }
// }

const moveInCollapse = ()=>{
  const hamburgerButton = document.querySelector('.navbar-toggler');
  const navbarMenu = document.querySelector('.navbar');
  const logo = document.querySelector('.navbar-brand>img');
  let expanded;
  hamburgerButton.addEventListener('click',()=>{
    expanded = hamburgerButton.getAttribute('aria-expanded');
    console.log(expanded);
    if(expanded == "true"){
    //  setTimeout(()=>{
        //navbarMenu.classList.toggle('bg-dark');
      //},360);
      navbarMenu.classList.remove('navbar-dark','bg-dark');
      navbarMenu.classList.add('navbar-light');
      console.log('closed');
      logo.src = "images/logo-dark.svg";
     }else{
       //navbarMenu.classList.add('bg-dark');
       navbarMenu.classList.remove('navbar-light');
       navbarMenu.classList.add('navbar-dark','bg-dark');
       logo.src = "images/logo-light.svg";
     }
  })
}



module.exports = {
    // toggleActive: toggleActive,
    moveInCollapse: moveInCollapse
};
