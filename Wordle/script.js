//define variables
let word = 'WATER'
let keyboardLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let wordLetters = Array(23).fill(0)
for (var x of word) wordLetters[keyboardLetters.indexOf(x)]++;
let cw = '' //current word
let row = 0   //current attempt

// let dark = false //dark theme
// // [grey, keys, background, letters, icons]
// let bg = [ // background (light/dark)
//   ['rgb(120,124,126)', 'rgb(211,214,218)', 'white', 'black'],
//   []
// ] 

let themes = [  //[green,yellow]
  ['rgb(106, 170, 100)', 'rgb(201,180,88)'],
  ['rgb(133, 192, 249)', 'rgb(245,121,58)']
]
let ct = 0 //current theme

//event listeners
for (var i = 0; i < keyboardLetters.length; i++) {
  //virtual keyboard
  document.getElementById(keyboardLetters.charAt(i)).addEventListener('click', function() {
    type(this.id)
  });
}
document.addEventListener('keydown', function(e) {
  for (var i = 0; i < keyboardLetters.length; i++) {
    if (e.code == 'Key' + keyboardLetters.charAt(i)) {
      type(keyboardLetters.charAt(i))
    }
  }
  if (e.code == 'Backspace') back();
  if (e.code == 'Enter') check();
})
document.getElementById('enter').addEventListener('click', check)
document.getElementById('del').addEventListener('click', back)

//functions
function type(letter) {
  if (cw.length != 5) {
    cw += letter;
    updateWord();
  }
}
function back() {
  cw = cw.slice(0, cw.length - 1);
  updateWord();
}
function updateWord() {
  for (var i = 0; i < 5; i++) document.getElementById('' + row + i).value = cw.charAt(i);
}
function check() {
  if (cw.length == 5 && row < 6) {
    let countLetters = Array(23).fill(0)
    let green = themes[ct][0];
    let yellow = themes[ct][1];
    let grey = 'rgb(120,124,126)';
    for (var i = 0; i < 5; i++) {
      //white letters
      document.getElementById('' + row + i).style.color = 'white';
      document.getElementById(cw.charAt(i)).style.color = 'white';

      if (cw.charAt(i) == word.charAt(i)) {
        //turn green
        document.getElementById('' + row + i).style.backgroundColor = green;
        document.getElementById(cw.charAt(i)).style.backgroundColor = green;
        countLetters[keyboardLetters.indexOf(cw.charAt(i))]++
      }
    }
    for (var i = 0; i < 5; i++) {
      if (document.getElementById('' + row + i).style.backgroundColor != green) {
        //check if yellow
        if (countLetters[keyboardLetters.indexOf(cw.charAt(i))] < wordLetters[keyboardLetters.indexOf(cw.charAt(i))]) {
          document.getElementById('' + row + i).style.backgroundColor = yellow;
          //update keyboard 
          if (document.getElementById(cw.charAt(i)).style.backgroundColor != green) {
            document.getElementById(cw.charAt(i)).style.backgroundColor = yellow;
          }
          countLetters[keyboardLetters.indexOf(cw.charAt(i))]++;
        } else { //turn grey
          document.getElementById('' + row + i).style.backgroundColor = grey;
          //keyboard 
          if (document.getElementById(cw.charAt(i)).style.backgroundColor != green && document.getElementById(cw.charAt(i)).style.backgroundColor != yellow) {
            document.getElementById(cw.charAt(i)).style.backgroundColor = grey;
          }
        }
      }
    }
    cw = '';
    row++;
  }
}

// https://www.w3schools.com/howto/howto_css_modals.asp