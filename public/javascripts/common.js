//  index numbers to judge what object user select.
var bgIndex=0;     var stIndex=0;
// a flag to judge what drawing style user select.
var drFlag=0;
// a flag to judge what bg appear.
var currentBg = 8;

var userName;
var userPicArray;

// for drawing
var drColor = "#000000";
var drSize = 10;
// for "undo" function
var groupNameNumber = 0;
var undoArray = new Array();
//var dataArray = new Array();
var tempData = "";

// for storing information what stamps(background) user use
var stArray = new Array();
var bgArray = new Array();
var imgArray  = [new Image(),new Image(),new Image(),new Image(),new Image()];
var memoryCanvasArray = [ "","","","",""];
var galleryNumber = 0;

var container = Object();    var $wrapper = Object();
var canvas1 = Object();     var $canvas1 = Object();
var canvas2 = Object();     var $canvas2 = Object();
var canvas3 = Object();     var $canvas3 = Object();
var canvas = Object();     var $canvas = Object();
var gallery = Object();     var $gallery = Object();
var picture = new Array();
var $picture = new Array();
// The number of hogehoge
var NUMofSTAMP = 10;
var NUMofBACKGROUND =10;
var NUMofCOLOR = 8;
var NUMofDRAWINGSTYLE = 3;  // pen, fun, brush
var NUMofFUNCTION = 2; // undo function, save function
var BgNameArray = ["tanada.jpg","pond.jpg","sky.jpg","canvas.png","effel_sunny.jpg","RkTKdjjij.jpg","flying-bird-1.jpg","coloring-book-pages-animals-6.jpg","images.png","landscape-coloring-page-6.jpg"];
var StNameArray = ["irony_face.png","dissatisfaction_face.png","dog.png","cat.png","sun.png","cloud.png","umbrella.png","snowman.png","tree.png","house.png",];
var COLORS = {"#DF0101" : "red", "#FF8000" : "orange", "#FFFF00" : "yellow", "#40FF00" : "green", "#0000FF" : "blue", "#FF00BF" : "pink", "#000000" : "black", "#F2F2F2" : "white",};

// for CentVizer
var ClickCount = 0;


$(function(){
    container = document.getElementById('wrap');    $wrapper = $('#wrap');
    canvas1 = document.getElementById('canvas1');    $canvas1 = $('#canvas1');
    canvas2 = document.getElementById('canvas2');    $canvas2 = $('#canvas2');
    canvas3 = document.getElementById('canvas3');    $canvas3 = $('#canvas3');
    gallery = document.getElementById('gallery');   $gallery = $('#gallery');

    for(var i=0;i<5;i++){
        picture[i] = document.getElementById('picture' + (i+1));
        $picture[i] = $('#picture' + (i+1));
    }

    writeLog(9,userName);

 });

// canvasClear is an object for clear the canvas.
var Canvasclear = {
    all : function(canvasNumber){
        $canvas = eval('$canvas' + canvasNumber);
        $canvas.clearCanvas();
        $canvas.removeLayers();
        if(canvasNumber == 2){
            undoArray = new Array();
            tempData = "";
        }
    },
    part: function(canvasNumber, layerName){
        $canvas = eval('$canvas' + canvasNumber);
        $canvas.removeLayer(layerName).drawLayers();
    },
    group: function(canvasNumber, layerName){
        $canvas = eval('$canvas' + canvasNumber);
        $canvas.removeLayerGroup(layerName).drawLayers();
    }
};

var  view =  function(viewNum,canvasNumber,nameNumber,x,y){
        $canvas = eval('$canvas' + canvasNumber);
        canvas = eval('canvas' + canvasNumber);
        if(canvasNumber==3){
            $canvas.drawImage({
             source: 'images/background/' + BgNameArray[viewNum-1],  layer:true,       name: 'view' + viewNum +'_' + nameNumber,
             x: x, y: y,
             width:(1/2)*canvas.height, height: (1/2)*canvas.height,
             fromCenter: true,  draggable:false,
             groups: ['palleteComponent'],
             touchend : function(){
                Sound.play(0);
                bgIndex = viewNum;
                ClickCount++;
                console.log("ClickCount : " + ClickCount);

                if(currentBg != bgIndex){
                    Canvasclear.all(2);
                    view(bgIndex,2,NUMofBACKGROUND);
                    $canvas2.moveLayer("view" + bgIndex + "_" + NUMofBACKGROUND,0);
                    currentBg = bgIndex;

                    if(currentBg!=5){
                        clearInterval(repeat);
                        repeatFlag=0;
                    }

                    var A = BgNameArray[bgIndex-1].split(".");
                    writeLog(1,A[0]);
                }
             },
             click : function(){
                Sound.play(0);
                bgIndex = viewNum;
                ClickCount++;
                console.log("ClickCount : " + ClickCount);

                if(currentBg != bgIndex){
                    Canvasclear.all(2);
                    view(bgIndex,2,NUMofBACKGROUND);
                    $canvas2.moveLayer("view" + bgIndex + "_" + NUMofBACKGROUND,0);
                    currentBg = bgIndex;

                    if(currentBg!=5){
                        clearInterval(repeat);
                        repeatFlag=0;
                    }

                    var A = BgNameArray[bgIndex-1].split(".");
                    writeLog(1,A[0]);
                }
            }
        });
        }
        else{
            bgArray[NUMofBACKGROUND] = "view" + viewNum +"_" + NUMofBACKGROUND ;
            tempData += "V." + viewNum;
            $canvas.drawImage({
             source: 'images/background/' + BgNameArray[viewNum-1],  layer:true,       name: 'view' + viewNum +'_' + nameNumber,
             x: 0, y: 0,
             width:canvas.width, height: canvas.height,
             fromCenter: false,  draggable:false,
         });
            if(currentBg!=5){
                clearInterval(repeat);
                repeatFlag=0;
            }
        }
    };

var stamps = function(stampNum,canvasNumber,nameNumber,x,y){
    $canvas = eval('$canvas' + canvasNumber);
    canvas = eval('canvas' + canvasNumber);
    if(canvasNumber == 3){
        $canvas.drawImage({
            source: 'images/stamp/' + StNameArray[stampNum-1],  layer:true,
            x: x, y: y,
            width:(1/2)*canvas.height, height: (1/2)*canvas.height,
            fromCenter: true,  draggable:false,    name: 'stamp' + stampNum + '_' + nameNumber,
            groups: ['palleteComponent'],
            click : function(e){
                Sound.play(0);
                ClickCount++;
                console.log("ClickCount : " + ClickCount);
                if(stIndex!=stampNum){
                    stIndex=stampNum;
                    Canvasclear.part(1,$canvas1.getLayer(0).name);
                    Text.text2();
                    $canvas1.moveLayer("text2" ,0);
                }
            },
            touchend : function(e){
                Sound.play(0);
                ClickCount++;
                console.log("ClickCount : " + ClickCount);
                if(stIndex!=stampNum){
                    stIndex=stampNum;
                    Canvasclear.part(1,$canvas1.getLayer(0).name);
                    Text.text2();
                    $canvas1.moveLayer("text2" ,0);
                }
            },
        });
    } else {
        stArray.push("stamp" + stampNum + "_" + stArray.length);
        tempData += "/S." + stampNum + "." + x + "." + y ;
        $canvas.drawImage({
            source: 'images/stamp/' + StNameArray[stampNum-1],  layer:true,
            x: x, y: y,
            width:(1/5)*canvas.height, height: (1/5)*canvas.height,
            fromCenter: true,  draggable:false,    name: 'stamp' + stampNum +'_' + nameNumber,
            groups: ['stamp' + stampNum + '_' + nameNumber],
        });
        undoArray.push("stamp" + stampNum + "_" + nameNumber);

        var A = StNameArray[stampNum-1].split(".");
        writeLog(2,A[0]);

        switch(parseInt(stampNum,10)){
            case 5:
                if(currentBg==5){
                  $canvas2.setLayer(bgArray[NUMofBACKGROUND],{
                  source:  'images/background/effel_sunny.jpg',
                  layer :true,
                }).drawLayers();
                clearInterval(repeat);
                repeatFlag=0;
              }
              break;
            case 7:
                if(currentBg == 5){
                  $canvas2.setLayer(bgArray[NUMofBACKGROUND],{
                      source:  'images/background/effel_rain.jpg',
                      layer :true,
                  }).drawLayers();
                  if(repeatFlag != 7 ){
                    clearInterval(repeat);
                    repeat = setInterval("rain_animation()",500);
                    repeatFlag=stIndex;
                  }
                }
            break;
            case 8:
                if(currentBg == 5){
                    $canvas2.setLayer(bgArray[NUMofBACKGROUND],{
                    source:  'images/background/effel-snow.jpg',
                    layer :true,
                    }).drawLayers();
                    if(repeatFlag != 8){
                        clearInterval(repeat);
                        repeat = setInterval("snow_animation()",500);
                        repeatFlag=stIndex;
                    }
                }
            break;
            default:
                break;
        }
    }
}