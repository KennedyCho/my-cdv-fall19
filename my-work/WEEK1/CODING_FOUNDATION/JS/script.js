// recreate box with js
// (createElement, className, appendChild)

// //create div tag
// let box = document.createElement("div");
// //name the div class
// box.className = 'box_style';
// //add div box to body of html
// document.body.appendChild(box)


// let button = document.createElement("button");
//
// button.className = 'button_style';
//
// document.body.appendChild(button)

// on click display box
document.getElementById('button').addEventListener('click', display_box)


// // test button and eventListener
// function display_confirm() {
//   console.log(document.getElementById('num_box').value);
// }

// show box when called
function display_box() {

  for (var i = 0; i < document.getElementById('num_box').value; i++) {
    //create div tag
    let box = document.createElement("div");
    //name the div class
    box.className = 'box_style';
    //add div box to body of html
    document.getElementById('container').appendChild(box)

  }


}
