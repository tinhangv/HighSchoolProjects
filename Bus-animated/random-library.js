//library of random functions


//return a random decimal between low (inclusive) and high (exclusive)
function randomDec(low, high){
  return Math.random()*(high - low) + low;
}

//return a random integer between low (inclusive) and high (exclusive)
function randomInt(low, high){
  return Math.floor(Math.random()* (high - low )+ low);
}


function randomRGB(){
  let r = randomInt(0, 256)
  let g = randomInt(0, 256)
  let b = randomInt (0, 256)
  return  "rgb(" + r + ', ' + g + ', ' + b + ')';
}

function randomHex(){
  let values = '0123456789ABCDEF'
  let output = '#'
  for (var i = 0; i<6; i++){
    output += values.charAt(Math.floor(Math.random()*16))
  }
  return output
}
