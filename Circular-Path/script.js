let cnv= document.getElementById('canvas')
let c = cnv.getContext('2d')

cnv.width = 500
cnv.height = 500

//mouse position
let mouseX = 0
let mouseY = 0
let rect = cnv.getBoundingClientRect();
cnv.addEventListener('mousemove', mouseHandler);
function mouseHandler(event){
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;

  // console.log('X: ' + Math.round(mouseX) + "  Y: " + Math.round(mouseY));
}
//mouse click
let mousedown=false
document.addEventListener('mousedown', mousedownHandler);
document.addEventListener('mouseup', mouseupHandler);
function mousedownHandler(event){
  mousedown = true;
}
function mouseupHandler(event){
  mousedown = false;
}

let followPath = 1
let followMouse = 0
let ePathx 
let ePathy 
let ex 
let ey 
let er=180
let eangle= 0
let espeed= Math.PI/400
let ecolor = 'blue'

let mx
let my 
let mr=50
let mangle= 0
let mspeed= Math.PI/50

let speed = 0
let prevMouseX = 0
let prevMouseY = 0

requestAnimationFrame(draw)

function draw(){
 // Clear the canvas to erase previous frame
  c.clearRect(0, 0, cnv.width, cnv.height);
  //moon
  c.beginPath()
  c.fillStyle = 'lightgrey'
  c.arc(mx, my, 15, 0, 2 * Math.PI)
  c.fill()
  //earth
  c.beginPath()
  c.fillStyle = ecolor
  c.arc(ex , ey , 25, 0, 2 * Math.PI)
  
  c.fill() 

  //animate
  ex = ePathx * followPath + mouseX * followMouse
  ey = ePathy * followPath + mouseY * followMouse
  //update moon position
  mangle -= mspeed
  mx = Math.cos(mangle)*mr + ex
  my = Math.sin(mangle)*mr + ey
  //update earth path
  eangle -= espeed
  ePathx = Math.cos(eangle)*er + 250
  ePathy = Math.sin(eangle)*er + 250
 //detect if earth clicked
  if(mousedown == true && Math.sqrt((ex-mouseX) **2 + (ey-mouseY)**2) <= 25  ){
    ecolor = 'green'
    followPath = 0
    followMouse = 1
  }else{
    ecolor = 'blue'
    followPath = 1
    followMouse = 0
  }

  //calculate speed
  let ex1, ey1
  if(followPath == 1){
    ex1 = ePathx
    ey1 = ePathy
  }else{
    ex1 = prevMouseX
    ey1 = prevMouseY
  }
  let dx = //change in e position between frames
  Math.abs(
    Math.sqrt(
      (ex - ex1)**2 +
      (ey - ey1)**2
    )
  )
  //display speed
  speed = dx /(1/60)
  c.fillStyle='green'
  c.font='17px Arial'
  c.fillText('Speed = ' + speed + ' px/s', 35,425)
  //store previous mouse position 
  prevMouseX = mouseX
  prevMouseY = mouseY

  //decoration
  //sun
  c.beginPath()
  c.fillStyle = 'yellow'
  c.arc(250, 250, 35, 0, 2 * Math.PI)
  c.fill()

  c.fillStyle='green'
  c.font='30px Arial'
  c.fillText('S O L A R    S Y S T E M', 35,35)

  requestAnimationFrame(draw)
}

