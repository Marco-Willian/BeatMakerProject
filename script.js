// import  { pressing }  from "./object.json";

let pressing = require('./object.json')

// const pressing = {
//     keyArrowDown :"ArrowDown",
//     keyArrowUp: "ArrowUp",
//     KeyArrowLeft: "ArrowLeft",
//     KeyArrowRight: "ArrowRight",
//     KeyArrowLeft: "ArrowLeft",
//     KeyEnter: "Enter"
// }



// var audio = new Audio("sounds/drums/virtual-drum_sounds_boom.wav");
// var audio2 = new Audio("sounds/drums/virtual-drum_sounds_clap.wav")
// var audio3 = new Audio("sounds/drums/virtual-drum_sounds_hithat.wav")
// var audio4 = new Audio("sounds/drums/virtual-drum_sounds_kick.wav")
// var audio2 = new Audio("sounds/drums/virtual-drum_sounds_openhat.wav")
// var audio6 = new Audio("sounds/drums/virtual-drum_sounds_ride.wav")

window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
  
      switch (event.key) {
        case pressing.keyArrowDown:
          audio.currentTime = 0;  
          audio.play();
          break;
        case pressing.keyArrowUp:
        //   audio2.currentTime = 0;  
        //   audio2.play();
          break;
        case "ArrowLeft":
          // Do something for "left arrow" key press.
          break;
        case "ArrowRight":
          // Do something for "right arrow" key press.
          break;
        case "Enter":
          // Do something for "enter" or "return" key press.
          break;
        case "Escape":
          // Do something for "esc" key press.
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
  
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    },
    true,
  );
  