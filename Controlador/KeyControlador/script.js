// import   pressing   from "./keys.js";
import  audio  from "../../objects/sounds.js";


const pegaValor = document.querySelector("#send");

const inputKey = [
  "first_custom_key",
  "second_custom_key",
  "third_custom_key",
  "fouth_custom_key",
  "fifth_custom_key"
];

let values = [];

pegaValor.addEventListener("click", function(event){
  event.preventDefault();
  
  values = inputKey.map(key => document.querySelector(`#${key}`).value);
})

window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      let soundToPlay = null;

      switch (event.key) {
        case values[0]:
          soundToPlay = new Audio(audio.boom);        
          break;
        case values[1]:
          soundToPlay = new Audio(audio.clap);      
          break;
        case values[2]:
          soundToPlay = new Audio(audio.hihat);        
          break;
        case values[3]:
          soundToPlay = new Audio(audio.kick);        
          break;
        case values[4]:
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
  