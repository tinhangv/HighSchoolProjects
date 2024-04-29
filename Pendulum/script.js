//canvas variables
let cnv = document.getElementById('c')
let ctx = cnv.getContext('2d')

cnv.width = 500
cnv.height = 500

//global variables
const pi = Math.PI
let sin = x => Math.sin(x)
let cos = x => Math.cos(x)

//initial conditions
let th = pi/3
let v = 2
let r = 250
let originX = 250, originY = 210
let x=cos(th+pi/2)*r + originX
let y= sin(th+pi/2)*r + originY

let squareRad = 20
let a =0.12 //gravitational acceleration
let followMouse =0 
let followPath =1


requestAnimationFrame(draw)
function draw(){
  // Clear the canvas to erase previous frame
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  if(mousedown &&
  mouseX >= x-squareRad &&
  mouseX <= x+squareRad &&
  mouseY >= y-squareRad &&
  mouseY <= y+squareRad || followMouse == 1 && mousedown){
    //calculate angle of mouse
    v = 0
    th = Math.atan2(-(mouseX - originX), (mouseY - originY))  
    fill('blue')
    followMouse = 1
    followPath = 0
  }else {
    fill('black')
    followMouse = 0
    followPath = 1
  }

  //update position
  x=cos(th+pi/2)*r + originX
  y= sin(th+pi/2)*r + originY

  //draw pendulum
  lineWidth(7)
  line(originX, originY, x, y)
  rect(x - squareRad, y-squareRad, 40, 40,'fill')

  //calculate speed
  v += a*(-sin(th))
  v*= 0.999
  
  //calculate angle
  if (th > pi)th -= 2*pi
  if (th< -pi)th+= 2*pi
  th +=  v/r

  requestAnimationFrame(draw)
}

//dectect mouse movements
let mouseX = 0
let mouseY = 0
let movementX = 0
let movementY = 0
document.addEventListener('mousemove', function (event) {
  let canvrect = cnv.getBoundingClientRect()
  mouseX = Math.round(event.clientX - canvrect.left);
  mouseY = Math.round(event.clientY - canvrect.top);
  console.log('X:' + mouseX + '  Y:' + mouseY)
  movementX = event.movementX
  movementY = event.movementY
})
//mouse click
let mousedown = false
document.addEventListener('mousedown', function (event){
  mousedown = true;
});
document.addEventListener('mouseup', function (event) {
  mousedown = false;
  v=Math.sqrt(movementX**2 + movementY**2)
  
  if(Math.atan2(-(mouseX-originX+movementX), (mouseY-originY+movementY)) - Math.atan2(-(mouseX-originX), mouseY-originY) < 0) v*=-1

  // if(movementX >=0 && movementY >=0 ){
  //   if(th>= -pi/4 && th< 3*pi/4 ) v*=-1
  // }else if(movementX >= 0 && movementY <0){
  //   if(th< pi/4 && th>= -3*pi/4) v*=-1
  // }else if(movementX <0 && movementY >=0){
  //   if(th< -3*pi/4 || th>= pi/4)v*=-1
  // }else if(movementX <0 && movementY <0){
  //   if(th < -pi/4 || th>= 3*pi/4)v*=-1
  // }

});