// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const mensaje = require('./mensajes/steps.json')
const venom = require('venom-bot');
let backToMenu = false;
let step1 = true;
let step2 = false;
let step3 = false;
let sendMessage;
let wellcomeMesage="*Hola, soy mostro, tu asesor virtual de emprendimiento* \n 1. *CREAR* - *¿Tienes una idea de empresa o emprendimiento?* \n 2. *CRECER* - *¿tienes una empresa legalmente constituida?* \n 3. - *Agenda de eventos*";
venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    body = message.body.toLowerCase();
  console.log("step1: ", step1);
    if (mensaje.STEP_1.includes(body) && step1) {
      step1 = false;
      step2 = true;
      client
      .sendText(message.from, wellcomeMesage)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      body= "";
    }
    else if ((mensaje.OPTION_1.includes(body) && step2) || backToMenu) {
      step2 = false;
      step3 = true;
      if (body == mensaje.OPTION_1[0] || body == mensaje.OPTION_1[4]){
        sendMessage = "¿Tienes el prototipo? \n (Escribe SI o NO)";
      }
      if(body == mensaje.OPTION_1[0] || body == mensaje.OPTION_1[4] ){
        sendMessage = "¿Tienes la Idea de negocio? \n Responde (SI o NO)";
      }
    
      body = "";
      client
      .sendText(message.from, sendMessage)
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
    }
    else if (mensaje.OPTION_1.includes(body) && !step2 && step3) {
      step3 = false;
      if(body == mensaje.RESPUESTA[0] || body == mensaje.RESPUESTA[2]){
        sendMessage = "Que bueno que tengas el prototipo";
      }
      if(body == mensaje.RESPUESTA[0] || body == mensaje.RESPUESTA[3]){
        sendMessage = "Que bueno que tengas esa idea \n No sabia que pensabas";
      }
      if(body == "3"){
        step1 = true;
        step2 = true;
        //backToMenu = true;
        sendMessage = wellcomeMesage;       
      }
      
      client
      .sendText(message.from, sendMessage)
      .then((result) => {
        console.log('Result: ', result); //return object success
        if(body == "3"){         
        return;
        }
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        if(body == "3"){
          return;
          }
      });
      body= "";
    }



    else{
      body= "";
      step1 = true;
      step2 = true;
      step3 = false;
      console.log(mensaje.ERROR[0])
      client
      .sendText(message.from,mensaje.ERROR[0])
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });

      client
      .sendText(message.from)
      .then((result) => {
        console.log('Result: ', result); //return object success 
        return
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
        return
      });
    }
  });
}
