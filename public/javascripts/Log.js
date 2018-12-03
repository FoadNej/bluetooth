// for Log
var tempLog = {};
var shouldLog = true;
var shouldAnimate = false;
//var shouldTouch = true;

$(function(){
    if(shouldLog)   setInterval("logEvent()",60000);
});

function logEvent(){
    console.log(tempLog);
    tempLog ={};
}

//  data1 : the name of bg or stamps, color, thickness
//  data2 : thickness
function writeLog( id , data1, data2){

    if(shouldLog){
        var time = Math.floor(new Date().getTime()/1000);

        switch(id){
            case 1:
                tempLog[time] = data1 + " background selected ";
            break;
            case 2:
                tempLog[time] = data1 + " stamp put ";
            break;
            case 3:
                tempLog[time] = "drawing with " + data1 + " , thickness " + data2;
            break;
            case 4:
                tempLog[time] = data1 + " color selected ";
            break;
            case 5:
                tempLog[time] = data1 + " thickness selected ";
            break;
            case 6:
                tempLog[time] = " undo ";
            break;
            case 7:
                tempLog[time] = " saving " + data1;
            break;
            case 8:
                tempLog[time] = " back to the main page ";
            break;
            case 9:
                tempLog[time] = data1 + " start playing the app ";
            break;
        }
    }
}