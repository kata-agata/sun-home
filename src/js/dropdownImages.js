import axios from "axios";

//-----------function to set selected image as topImage
//pass parameters with put method
//passing slug(to find project) and imgSrc(to be changed)
//second arg in axios.put is {} where should body be placed if any
const setImageSrc = async (slug, imageSrc) => {
  let url = slug;
  await axios.put(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      params: imageSrc,
    }
  );
};

//images displayed in dropdown-menu
const images = document.querySelectorAll(".dropdown-menu .dropdown-item");
//all project images from database displayed in project details
const cards = document.querySelectorAll(".card-columns .card");

export default {
  clickDropdown() {
    //adding click eventlistener to each image selected form dropdown
    for (let i = 0; i < images.length; i++) {
      let item = images[i];
      item.addEventListener("click", () => {
        let slug = window.location.pathname; //get path of current project
        let imageSrc = item.children[0].children[0].getAttribute("src"); // geting src of each image
        setImageSrc(slug, imageSrc); // set selected image as topImage, saved to database

        //every time click occurs remove style of each displayed image
        //highlight only selected image

        let cardImage = document.querySelector('img.card-img');
        cardImage.src = imageSrc;


        // for (let j = 0; j < cards.length; j++) {
        //   let card = cards[j];
        //   let cardImageSrc = card.children[0].getAttribute("src");
        //
        //   // if (cardImageSrc === imageSrc) {
        //   //   card.classList.add("border-success");
        //   // } else {
        //   //   card.classList.remove("border-success");
        //   // }
        // }
      });
    }
  },
};
