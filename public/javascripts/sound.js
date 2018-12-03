window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new window.AudioContext();
var buffer = new Array();
var NUMofSOUND = 6;
var soundArray = ['./sounds/water-drop1.ogg','./sounds/Rain.ogg','./sounds/sunnyday.ogg','./sounds/BellsRinging.ogg','./sounds/german.ogg','./sounds/Cat.ogg']
var sourceArray = new Array();
//var soundCheckArray = [false,false,false,false,false,false,false];

var Sound = {
    load : function(number){

        var request = new XMLHttpRequest();
        request.open('GET', soundArray[number], true);
        request.responseType = 'arraybuffer';

        request.send();
        request.onload = function () {
            var res = request.response;
            context.decodeAudioData(res, function (buf) {
//                buffer.push(buf);
                  buffer[number]=buf;
            });
        };
    },
    play : function(number){
        sourceArray[number] = context.createBufferSource();
        sourceArray[number].buffer = buffer[number];
        sourceArray[number].connect(context.destination);
        sourceArray[number].start(0);
    },
    stop : function(number){
        sourceArray[number].stop(0);
    }
};

$(function(){
    var i=0;
    for(i=0;i<NUMofSOUND;i++){
        Sound.load(i);
    }
});

