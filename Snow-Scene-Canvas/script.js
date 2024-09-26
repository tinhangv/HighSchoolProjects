// global variables
let cnv = document.getElementById('c')
let ctx = cnv.getContext('2d')
cnv.height = 500
cnv.width = 500

let snowflakes = []
for(var i=0; i<100; i++){
  snowflakes.push({
    x: randomDec(0, cnv.width),
    y: randomDec(0, cnv.height),
    yv: randomDec(0.4, 0.7),
    xa: randomDec(-0.005, 0.005),
    xv: randomDec(-0.3, 0.3),
    xvmax: randomDec(0.2, 0.4)
  })
}
let tx = 50
let windows = [] 

setInterval(randomWindowOn, 5000) //toggle random window every 5 sec
function randomWindowOn(){
  let randomBuilding = randomInt(0,windows.length-1)
  let winPos = windows[randomBuilding][randomInt(0,windows[randomBuilding].length -1)]
  toggle()
  setTimeout(toggle, 250)
  setTimeout(toggle , 800)
  setTimeout(toggle, 1050)
  setTimeout(toggle, 1400)
  function toggle(){
    if(winPos.on != true) winPos.on = true
    else winPos.on = false
  }
}
let winArrCreated = [] //for innitializing window array

requestAnimationFrame(draw)
function draw(){
  // Clear the canvas to erase previous frame
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  fill('white')
  circle(420, 50, 20, 'fill')

  fill('lightblue') //buildings
  rect(100, 400, 70, -300, 'fill'); drawWindows(100, 300, 0);
  fill('darkblue')
  rect(300, 400, 70, -350, 'fill'); drawWindows(300, 350, 1);
  fill('turquoise')
  rect(50, 400, 70, -220, 'fill'); drawWindows(50, 220, 2);
  fill('darkgreen')
  rect(220, 400, 70, -250, 'fill'); drawWindows(220, 250, 3)
  // font('20px sans-serif'); fill('green')
  // text('looks like  H    I    S    T    O    G    R    A    M', 40, 30, 'fill')

  function drawWindows(x,y, building){
    if(winArrCreated[building] != true)windows[building] = []
    let windowIndex = 0
    fill('yellow')
    for(var i=405 - y; i< 400; i+= 15){ //loop through rows
      for(var j= x+5; j< x+55; j += 15){ //loop through columns
        if(winArrCreated[building] !== true){
          let winOn = randomInt(0,2) != 0 //2 in 3 chance of on
          windows[building].push({x:j, y:i, on:winOn})
        }
        rect(j, i, 10, 10, 'stroke')
        if(windows[building][windowIndex].on)rect(j, i, 10, 10, 'fill')
        windowIndex ++
      } 
    }
    winArrCreated[building] = true
  }

  fill('white')
  for(var i=0; i<snowflakes.length; i++){
    //draw snowflakes
    circle(snowflakes[i].x, snowflakes[i].y, .8, 'fill')
    //fall down
    snowflakes[i].y += snowflakes[i].yv
    if(snowflakes[i].y > cnv.height) { //back to top
      snowflakes[i].y = -2
      snowflakes[i].x = randomDec(0, cnv.width)
    }
    //sway side to side
    snowflakes[i].x += snowflakes[i].xv
    snowflakes[i].xv += snowflakes[i].xa
    if(Math.abs(snowflakes[i].xv) > snowflakes[i].xvmax){
      snowflakes[i].xa *= -1
    }
  }

  //ground
  rect(0, 400, cnv.width, cnv.height, 'fill')
  fill('grey')//platform
  rect(0, 460, cnv.width, cnv.height, 'fill')
  fill('yellow')//yellow line
  rect(0, 470, cnv.width, 3, 'fill')

  fill('grey') //rail
  rect(0, 450, cnv.width, 5, 'fill')
  rect(0, 420, cnv.width, 5, 'fill')
  fill('brown') 
  for(var i=0; i<cnv.width; i+= 20) rect(i, 425, 10, 25, 'fill')
  fill('grey') //fence
  rect(0, 365, cnv.width, 3, 'fill')
  rect(0, 410, cnv.width, 3, 'fill')
  for(var i=0; i<cnv.width; i+= 5) rect(i, 368, 2, 42, 'fill')
  rect(0, 330, cnv.width, 2, 'fill') //electric thing

  drawTrain(tx)
  drawTrain(tx - 210)
  if(tx > 210 && tx < 325){
    tx += 0.5
    font('15px solid'); fill('black');
    text('The train to [ ] is arriving. Please let passengers exit first.', 35, 490, 'fill')
  } 
  else tx += 1.7
  if(tx - 250 >cnv.width) tx = -300

  requestAnimationFrame(draw)
}

function drawTrain(x){
  fill('lightgrey') //train
  rect(x, 375, 200, 70, 'fill')
  rect(x, 375, 200, 70, 'stroke')
  rect(x+80, 375, 30, -10, 'fill')
  line(x+90, 375-10, x+65, 375-20) //pantograph
  line(x+65, 375-20 , x+105, 375-40)
  line(x+113, 375-40, x+92, 375-40)
  fill('blue')
  rect(x, 375+50, 200, 7, 'fill')
}

document.addEventListener('keydown', function (event){
  if(event.code == 'ArrowLeft')snowflakes.pop()
  if(event.code == 'ArrowRight')snowflakes.push({
    x: randomDec(0, cnv.width),
    y: randomDec(0, cnv.height),
    yv: randomDec(0.3, 0.7),
    xa: randomDec(0.003, 0.007),
    xv: randomDec(-0.3, 0.3),
    xvmax: randomDec(0.4, 0.6)
  })
  if(event.code == 'ArrowUp')speed('up')
  if(event.code == 'ArrowDown')speed('down')
})

function speed(change){
  for(var i=0; i<snowflakes.length; i++){
    if(change == 'up'){ if(snowflakes[i].yv < 1.5)snowflakes[i].yv += randomDec(0.01, 0.1)}
    else {if(snowflakes[i].yv > 0.45) snowflakes[i].yv -= randomDec(0.01, 0.2)}
  } 
}

//dectect mouse movements
let mouseX = 0
let mouseY = 0
cnv.addEventListener('mousemove', function (event) {
  let canvrect = cnv.getBoundingClientRect()
  mouseX = Math.round(event.clientX - canvrect.left);
  mouseY = Math.round(event.clientY - canvrect.top);
  console.log('X:' + mouseX + '  Y:' + mouseY)
})