require("babel-runtime/regenerator");
require("webpack-hot-middleware/client?reload=true");
require("./main.scss");
require("./views/index.hbs");
require("./views/signin.hbs");
import 'bootstrap';

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
