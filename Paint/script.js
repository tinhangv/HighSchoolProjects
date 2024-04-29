//global variables
let cnv = document.getElementById('c')
let ctx = cnv.getContext('2d')

cnv.width = 1200
cnv.height = 700

let colours = document.getElementsByClassName('colours')
let eraser = document.getElementById('eraser')

let isEraser = false
let eraseRad = 10

for (var i = 0; i < colours.length; i++) {
  colours[i].style.backgroundColor = colours[i].id
}

function select(colour) {
  for (var i = 0; i < colours.length; i++) {
    colours[i].style.border = '1px solid grey'
    eraser.style.border = 'none'
  }
  document.getElementById(colour).style.border = '3px solid black'
  if(colour == 'black')document.getElementById(colour).style.border = '3px solid grey'
  stroke(colour)
  fill(colour)
  if(colour =='eraser')isEraser = true
  else isEraser = false
}

let mouseX = 0, mouseY=0, mousedown = false

//mouse click
document.addEventListener('mousedown', function (event){
  mousedown = true;
  if(mouseX>=0&&mouseX<=cnv.width&&mouseY>=0&&mouseY<=cnv.height&&!isEraser)circle(mouseX, mouseY, ctx.lineWidth/2, 'fill')
});
document.addEventListener('mouseup', function (event) {
  mousedown = false;
});

//dectect mouse movements
document.addEventListener('mousemove', function (event) {
  if(mousedown){
    if(isEraser){
      ctx.clearRect(mouseX-eraseRad, mouseY-eraseRad, 2*eraseRad, 2*eraseRad)
    }else {
      line(mouseX, mouseY, event.movementX+mouseX, event.movementY+mouseY)
      circle(mouseX, mouseY, ctx.lineWidth/2, 'fill')
      circle(mouseX+event.movementX, mouseY+event.movementY, ctx.lineWidth/2, 'fill')
    }
  }
  let canvrect = cnv.getBoundingClientRect()
  mouseX = Math.round(event.clientX - canvrect.left);
  mouseY = Math.round(event.clientY - canvrect.top);
  console.log('X:' + mouseX + '  Y:' + mouseY)
})

document.querySelector('#clear').addEventListener('click', function(){
  ctx.clearRect(0,0,cnv.width, cnv.height)
})  

function thickness(x){
  lineWidth(x)
}
