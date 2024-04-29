'use strict'

//variables
let selectedOp = 'custom' // '+'  '-'  '*'  '/'  'custom'
let customOp = {add : 0, sub : 0, mul : 0, div : 0}
let questionAmount = 10
let questionNum = 1
let upto = 12
let operation = []
let a,b,c,score,ans
//event listners
document.getElementById('start').addEventListener('click', startquiz)
document.getElementById('next').addEventListener('click',next)
document.getElementById('prev').addEventListener('click',prev)

document.getElementById('gotoBtn').addEventListener('click', goto)
document.getElementById('goHome1').addEventListener('click', goHome)
document.getElementById('goHome2').addEventListener('click', goHome)
document.getElementById('endQuiz').addEventListener('click', displayRes)

//functions
function select(op, text){
  selectedOp = op
  if(op!= 'custom'){
    document.getElementById('settingsH3').innerHTML= text
    document.getElementById('qsettings1').style.display = "block"
    document.getElementById('qsettings2').style.display = "none"
    document.getElementById('startDiv').style.display = "block"
    document.getElementById('welcome').style.display = "none"
  }else {
    document.getElementById('qsettings2').style.display = "block"
    document.getElementById('qsettings1').style.display = "none"
    document.getElementById('startDiv').style.display = "block"
    document.getElementById('welcome').style.display = "none"
    document.getElementById('check10').checked = false
    document.getElementById('check25').checked = false
    document.getElementById('check50').checked = false
    document.getElementById('error').style.display = "none"
  }
}

function toggleChecked(x, checked){
  let id = 'check' + x
  let num = [10, 25, 50]
  if(checked) questionAmount = x
  else questionAmount = 10
  for(var i=0; i<num.length; i++){
    if(num[i] == x)continue
    id = 'check' + String(num[i])
    document.getElementById(id).checked = false
  }
}

function checkOp(op, checked){
  let value
  if(checked)value = 1
  else value = 0
  
  if(op == 'add')customOp.add = value
  else if(op == 'sub')customOp.sub = value
  else if(op == 'mul')customOp.mul = value
  else if(op == 'div')customOp.div = value

  document.getElementById('error').style.display = "none"
}

function reset(){
    questionNum=1
    document.getElementById('result').style.display= 'none'
    score = []
    ans = []
    operation =[]
    upto = 12

    document.getElementById('inp').value = ''
    document.getElementById('goto').value = ''
    document.getElementById('next').innerHTML='next'
    document.getElementById('endQuiz').style.display = "inline"
}

function startquiz(){
  reset()
  
  if(selectedOp == 'custom' && document.getElementById('customQ').value != ''){
      questionAmount = Number(document.getElementById('customQ').value)
  }
  if(selectedOp == 'custom' && document.getElementById('customUpto').value != ''){
      upto = Number(document.getElementById('customUpto').value)
  }

  if(selectedOp=='custom' && customOp.add + customOp.sub + customOp.mul + customOp.div == 0
      || selectedOp =='custom' && Number(document.getElementById('customQ').value) <= 0 ){
      //diplay error
      document.getElementById('error').style.display = "block"
  }else if(selectedOp == 'custom' && upto == 0){
      //error
  }else{  //start quiz succesfully
      document.getElementById('error').style.display = "none"

      document.getElementById('question').style.display = "block"
      document.getElementById('home').style.display = 'none'
      document.getElementById('title').innerHTML = 'Quiz'
      //generate questions
      a=[] 
      b=[]
      c=[]
      let opAmount = customOp.add + customOp.sub + customOp.mul + customOp.div
      let selectedCustomOp = []
      if(customOp.add == 1)selectedCustomOp.push('+')
      if(customOp.sub == 1)selectedCustomOp.push('-')
      if(customOp.mul == 1)selectedCustomOp.push('*')
      if(customOp.div == 1)selectedCustomOp.push('/')
      
      console.log(selectedCustomOp)
      for(let i=1; i<= questionAmount; i++){
          //operation selector
          if(selectedOp == '+' || selectedOp == '-' || selectedOp == '*' || selectedOp == '/'){
              if(selectedOp == '+')operation[i] = '+'
              else if(selectedOp == '-')operation[i] = '-'
              else if(selectedOp == '*')operation[i] = '*'
              else if(selectedOp == '/')operation[i] = '/'
              
          //operation randomizer
          }else if(selectedOp == 'custom'){
              let rand = Math.floor(Math.random()*opAmount)
              operation[i] = selectedCustomOp[rand]
          }
          //generate values
          if (operation[i] == '+' || operation[i] == '-' || operation[i] == '*' ){
              a[i]= Math.round(Math.random()*upto);
              b[i]= Math.round(Math.random()*upto);
              if (operation[i] == '+')c[i]= a[i]+b[i]
              else if(operation[i] == '-' )c[i]=a[i]-b[i]
              else if(operation[i] == '*' )c[i]= a[i]*b[i]
            
          }else if(operation[i] == '/'){
              b[i]= Math.round(Math.random()*(upto-1))+1;
              c[i]= Math.round(Math.random()*upto);
              a[i]= b[i]*c[i]
          }
      }
      console.log(a)
          console.log(b)
          console.log(c)
          console.log(operation)

      //display question 1
      document.getElementById('a').innerHTML= a[1]
      document.getElementById('b').innerHTML= b[1]
      document.getElementById('op').innerHTML= operation[questionNum]
      document.getElementById('qNum').innerHTML = questionNum
      document.getElementById('qAm').innerHTML = questionAmount

      //buttons when only 1 question
      if(questionAmount == 1){
          document.getElementById('next').innerHTML='submit'
          document.getElementById('endQuiz').style.display = "none"
      }
    }
}

function next(){
    if(questionNum == questionAmount -1){
        document.getElementById('next').innerHTML='submit'
        document.getElementById('endQuiz').style.display = "none"
    }
    if (questionNum == questionAmount){
        trackscore()
        displayRes()
    }else{
        trackscore()
        questionNum ++
        document.getElementById('inp').value = ans[questionNum]
        
        //display question
        document.getElementById('a').innerHTML= a[questionNum]
        document.getElementById('b').innerHTML= b[questionNum]
        document.getElementById('op').innerHTML= operation[questionNum]
    
        document.getElementById('qNum').innerHTML = questionNum
        document.getElementById('qAm').innerHTML = questionAmount
        if(questionNum != 1){
            document.getElementById('prev').style.display = "inline"
        }
    }
}
function prev(){
    trackscore()
    document.getElementById('next').innerHTML='next'
    questionNum --
    document.getElementById('inp').value = ans[questionNum]

    document.getElementById('a').innerHTML= a[questionNum]
    document.getElementById('b').innerHTML= b[questionNum]
    document.getElementById('op').innerHTML= operation[questionNum]
    
    document.getElementById('qNum').innerHTML = questionNum
    document.getElementById('qAm').innerHTML = questionAmount

    document.getElementById('endQuiz').style.display = "inline"
    if(questionNum==1)document.getElementById('prev').style.display = "none"
    
}
function goto(){
    trackscore()
    let x =Number(document.getElementById('goto').value)
    document.getElementById('goto').value = ''
    if(x>0 && x<= questionAmount){
        document.getElementById('next').innerHTML='next'
        document.getElementById('endQuiz').style.display = "inline"
        questionNum = x
        document.getElementById('inp').value = ans[questionNum]

        document.getElementById('a').innerHTML= a[questionNum]
        document.getElementById('b').innerHTML= b[questionNum]
        document.getElementById('op').innerHTML= operation[questionNum]
    
        document.getElementById('qNum').innerHTML = questionNum
        document.getElementById('qAm').innerHTML = questionAmount

        if(questionNum==1){
            document.getElementById('prev').style.display = "none"
        }
        if(questionNum == questionAmount ){
            document.getElementById('next').innerHTML='submit'
            document.getElementById('endQuiz').style.display = "none"
        }
        if(questionNum != 1){
            document.getElementById('prev').style.display = "inline"
        }
    }
}
function trackscore(){
    ans[questionNum] = document.getElementById('inp').value

    if (ans[questionNum] == c[questionNum] && ans[questionNum] != ''){
        score[questionNum] = 1
    }else{
        score[questionNum]=0
    }
}
function displayRes(){
    //calculate total score
    let total = 0
    for(let i = 1; i<= questionAmount;i++) {
        if(score[i] == undefined){
            score[i] = 0
        }
        total += score[i]
    }
    console.log(score)
    //display
    document.getElementById('question').style.display = "none"
    document.getElementById('correctAns').innerHTML= total
    document.getElementById('totalAns').innerHTML = questionAmount
    document.getElementById('title').innerHTML='Results'
    document.getElementById('result').style.display = "block"
}
function goHome(){
    document.getElementById('title').innerHTML='Simple Operations!'
    document.getElementById('home').style.display = "block"
    document.getElementById('question').style.display = "none"
    document.getElementById('result').style.display = "none"
}
