import   pressing   from "./keys.js";
import  audio  from "./sounds.js";

window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      let soundToPlay = null;

      switch (event.key) {
        case pressing.keyArrowDown:
          soundToPlay = new Audio(audio.boom);        
          break;
        case pressing.keyArrowUp:
          soundToPlay = new Audio(audio.clap);      
          break;
        case pressing.KeyArrowLeft:
          soundToPlay = new Audio(audio.hihat);        
          break;
        case pressing.KeyArrowRight:
          soundToPlay = new Audio(audio.kick)        
          break;
        case pressing.keyD:
          if(event.ctrlKey){
            soundToPlay = new Audio(audio.tink)
          }else{
            soundToPlay = new Audio(audio.snare)
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
  