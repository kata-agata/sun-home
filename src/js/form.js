import axios from "axios";
const { getError } = require('./errorHelper.js')

//get response from post request
 const getData = async (url,data) => {
   let response = await axios(url, {
       method: 'POST',
       headers: {
         'content-type': 'application/json',
       },
       params: data,
     })
     return response.data;
};



  export default {
  //function to send e-mail from contact form
  confirmForm() {
    //submit button
    const sendButton = document.querySelector("#formSubmit");


    //when click on button send e-mail and get response form server
    sendButton.addEventListener("click", async (event) => {
          event.preventDefault(); //prevents expressjs redirecting to blank page with plain json
          const name = document.querySelector('#clientName').value;
          const email = document.querySelector('#clientEmail').value;
          const subject = document.querySelector('#enquirySubject').value;
          const text = document.querySelector('#enquiryText').value;
          let data = { name, email, subject, text };
          //console.log(data);
          let url = window.location.pathname; //get path of current project
          //let url = 'http://localhost:8080/testapp';
          let message = document.querySelector('#message'); // geting div to display message
          let inputs = ['name', 'email', 'text'];

          try{
            let response = await getData(url, data);
            //console.log(response);
            const errorsArray = response.errors; // array of all errors recived from server

            inputs.forEach((item, i) => {
              let validationMessage = getError(errorsArray, item); //single message - string, if no message string is empty
            //console.log(validationMessage);
              let classSelector = "." + item + "-msg"; // create class seletor of each item
              let validationParagraph = document.querySelector(classSelector.toString());
              validationParagraph.innerText =validationMessage;
            });

           message.innerText=response.message;
         }catch(err){
           message.innerText = `Wystąpił błąd: ${err}`
         }

      });
    }
};
