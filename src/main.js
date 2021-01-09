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
require("./js/typewriter");
//require('bootstrap/dist/js/bootstrap');

// navbar.toggleActive();
try{
navbar.menuDisplay();
}
catch{
  console.log('no navbar');
}

dropdown.clickDropdown();
form.confirmForm();

// require("./views/index.hbs");
// require("./views/signin.hbs");

// var indexPage = require("./views/index.hbs");
//
// document.addEventListener("DOMContentLoaded", function() {
// 	var div = document.createElement('div');
// 	div.innerHTML = indexPage({
// 		title: "test"
// 	});
// 	document.body.appendChild(div);
// });

//console.log(Realization);
// import buttonStyle from './styles/button.scss';
//
// // var a = async(args) => {
// //   const {a,b} = args;
// //   await console.log('Hello from the future',a,b);
// //   console.log("done");
// // }
// //
// // a({a:1,b:2})
//
// let button2 = document.createElement("button");
//
//  let div = document.querySelector('#test');
//
//  div.innerHTML = `<button class="${buttonStyle.btn}">Click</button>`;

console.log(`Enviroment is ${process.env.NODE_ENV}`);

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
