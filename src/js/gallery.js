import axios from "axios";

export default {
//module.exports = {
  display() {
    //use jquery because cant find way to fir this in pure javascript
    //when modal show set active carousel-item to be displayed
    $("#realization-gallery-modal").on('show.bs.modal', function (event) {

      var photo = $(event.relatedTarget) // anchor that triggered the modal
      var imgsrc = photo.data('imgsrc') //getting image src from <a>

      let item = document.querySelector(`.carousel-item img[src=${CSS.escape(imgsrc)}]`); // find carousel item with clicked image
      item.parentElement.classList.add('active');

    })

    //remove active class from each carousel-item when modal closed
    //prevents overlapping of active items
    $("#realization-gallery-modal").on('hidden.bs.modal', function (event) {

      let items = document.querySelectorAll('.carousel-item');

      // items is NodeList so array functions don't work
      // [] is same as ArrayPrototype
      //then we can use forEach
      //call change this

      [].forEach.call(items, function(el) {
        el.classList.remove("active");
      });
    })

  },
  addDeleteButton(){
    let path = window.location.pathname;
    let galleryItems = document.querySelectorAll('.gallery-item');
    let galleryItemsArray = [...galleryItems];
    console.log(galleryItemsArray);
    galleryItems.forEach((item, index) => {

      let form = document.createElement("form");
      form.action = `${path}/${index}?_method=DELETE`;
      form.method = "POST";
      let button = document.createElement("button");
      let i = document.createElement("i");
      let iClass = ["fas", "fa-trash", "fa-1x"];
      let btnClass = ["btn", "btn-delete"]
      i.classList.add(...iClass);
      button.classList.add(...btnClass);
      button.type = "submit";
      button.appendChild(i);
      form.appendChild(button);
      item.appendChild(form);
      deleteImage(item, index);
    });
  }
}

function deleteImage(item, index){
  const msg = document.createElement("span");
  let path = window.location.pathname;
  const button = item.children[1].children[0];

  button.addEventListener("click", async (event) => {
      event.preventDefault();// stop redirecting by express js
      let response = await deleteImgFromDb(path,index); // delete image from array and database, wait for respons 'OK'
      item.parentElement.insertBefore(msg, item); //add info span to show message
      if(response === "OK"){
        msg.innerText = 'Zdjęcie usunięte'; // add info
        item.parentElement.removeChild(item); //remove clicked gallery-item
      } else {
        msg.innerText = 'Coś poszło nie tak, spróbuj ponownie'
      }
      setTimeout(function(){
        msg.parentElement.removeChild(msg);
      }, 3000) // remove info after 3s
  });
}


// delete image from database, return status if operation succeed
const deleteImgFromDb = async (slug, imageId) => {
  let url = `${slug}/${imageId}`;
  let response = await axios.delete(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      params: imageId,
    }
  );
  return response.data;
};
