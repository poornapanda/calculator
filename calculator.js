let runningTotal = 0;
let buffer = "0";
let previouOperator;

let screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        //its not a number
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    if(symbol === 'C'){
        buffer = '0';
        runningTotal = 0;
    }
    switch(symbol){
        case "C":
        buffer = '0';
        runningTotal = 0;
        break;
        case "=" :
         if(previouOperator == null)  {
             return;
         }
         flushOperation(parseInt(buffer));
         previouOperator = null;
         buffer = runningTotal;
         runningTotal = 0;
         break;
        case "&larr" :
            if(buffer.length === 1) {
                buffer = '0';
            }
            else {
                buffer = buffer.substring(0,buffer.length-1);
            }
            break;
        case "+":
        case "-":
        case "&divide":
        case "&times" :
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        //do nothing
        return;
    }
    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }
    else {
        flushOperation(intBuffer);
    }
    previouOperator = symbol;
}

function flushOperation(intBuffer){
    if(previouOperator === '+'){
        runningTotal += intBuffer;
    }
    else if(previouOperator === '-'){
        runningTotal -= intBuffer;
    }
    else if(previouOperator === '*'){
        runningTotal *= intBuffer;
    }
    else {
        runningTotal /= intBuffer;
    }
    console.log('runningTotal',runningTotal);
}

function handleNumber(numberString){
    if(buffer === "0"){
        buffer = numberString;
    }
    else {
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();