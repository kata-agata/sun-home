require("babel-runtime/regenerator");
require("webpack-hot-middleware/client?reload=true");
require("./main.scss");
//import $ from 'jquery';
//const Realization = require('./models/realization');
const $ = require('jquery');
global.$ = global.jQuery = $;
require('bootstrap');
const navbar = require('./js/navbar');
import {throttle} from 'lodash';
import dropdown from './js/dropdownImages';
import form from './js/form';
import gallery from './js/gallery';
require("./js/typewriter");
//require('bootstrap/dist/js/bootstrap');


document.addEventListener("DOMContentLoaded", function(event) { //fired when document ready, but not all is loaded so it is done earlier
  let url = window.location.pathname;


  if(!url.includes('/adminPanel')){ //other then admin panel

    try{
    navbar.menuDisplay();
    }
    catch{
      console.log('no navbar');
    }
    //contact form
    try{
    form.confirmForm();
    }catch{
      console.log('no form');
    }
  } else { //!!!!!!!!!!!only in admin panel
    //add delete button to gallery items in realization
    try{
      gallery.addDeleteButton();
    }catch{
      console.log("buttons not displayed");
    };
    //dropdown setting topImage in realization
    try{
    dropdown.clickDropdown();
    }catch{
      console.log('no dropdown');
    }

  }
});


//gallery modal - for main page and adminPanel
try{
gallery.display();
}catch{
  console.log('no gallery');
}


var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 1000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 130 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };
