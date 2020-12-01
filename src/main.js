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
//require('bootstrap/dist/js/bootstrap');

// navbar.toggleActive();
navbar.menuDisplay();

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

console.log(`Enviroment is ${process.env.NODE_ENV}`)
