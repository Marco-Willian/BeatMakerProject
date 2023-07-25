import   pressing   from "./keys.js";
import  audio  from "./sounds.js";


const pegaValor1 = document.querySelector("#first_send");
const pegaValor2 = document.querySelector("#second_send");
const pegaValor3 = document.querySelector("#third_send");
const pegaValor4 = document.querySelector("#fouth_send");
const pegaValor5 = document.querySelector("#fifth_send");

let firt_value;
let second_value;
let third_value;
let fouth_value;
let fifth_value;

pegaValor1.addEventListener("click", function(event){
  event.preventDefault();

  const name = document.querySelector("#first_custom_key");

  firt_value = name.value;
})

pegaValor2.addEventListener("click", function(event){
  event.preventDefault();

  const name = document.querySelector("#second_custom_key");

  second_value = name.value;
})

pegaValor3.addEventListener("click", function(event){
  event.preventDefault();

  const name = document.querySelector("#third_custom_key");

  third_value = name.value;
})

pegaValor4.addEventListener("click", function(event){
  event.preventDefault();

  const name = document.querySelector("#fouth_custom_key");

  fouth_value = name.value;
})

pegaValor5.addEventListener("click", function(event){
  event.preventDefault();

  const name = document.querySelector("#fifth_custom_key");

  fifth_value = name.value;
})

window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      let soundToPlay = null;

      switch (event.key) {
        case firt_value:
          soundToPlay = new Audio(audio.boom);        
          break;
        case second_value:
          soundToPlay = new Audio(audio.clap);      
          break;
        case third_value:
          soundToPlay = new Audio(audio.hihat);        
          break;
        case fouth_value:
          soundToPlay = new Audio(audio.kick);        
          break;
        case fifth_value:
          if(event.ctrlKey){
            soundToPlay = new Audio(audio.tink);
          }else{
            soundToPlay = new Audio(audio.snare);
          }
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
      if(soundToPlay){
        soundToPlay.currentTime = 0;
        soundToPlay.play();
      }
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    },
    true,
  );
  