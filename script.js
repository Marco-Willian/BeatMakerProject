// import   pressing   from "./keys.js";
import  audio  from "./sounds.js";


const pegaValor = document.querySelector("#send");

let firt_value;
let second_value;
let third_value;
let fouth_value;
let fifth_value;

pegaValor.addEventListener("click", function(event){
  event.preventDefault();
  
  const key_1 = document.querySelector("#first_custom_key");
  const key_2 = document.querySelector("#second_custom_key");
  const key_3 = document.querySelector("#third_custom_key");
  const key_4 = document.querySelector("#fouth_custom_key");
  const key_5 = document.querySelector("#fifth_custom_key");

  firt_value = key_1.value;
  second_value = key_2.value;
  third_value = key_3.value;
  fouth_value = key_4.value;
  fifth_value = key_5.value;

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
  