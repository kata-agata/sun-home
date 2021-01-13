export default {

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

  }
}
