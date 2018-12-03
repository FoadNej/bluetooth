var Text = {
  text1 : function(){
    $canvas1.drawText({
      fillStyle: "#000000",   fontSize:(1/4)*canvas1.height,    fontFamily:"Arial", layer:true,
     x:(5/40)*canvas1.width, y:(1/2)*canvas1.height,
      text:"Select \n the component",
      name : "text1",
    });
  },
  text2 : function(){
    $canvas1.drawText({
      fillStyle: "#000000",   fontSize:(1/4)*canvas1.height,    fontFamily:"Arial", layer:true,
     x:(5/40)*canvas1.width, y:(1/2)*canvas1.height,
      text:"Touch \n the location",
      name : "text2",
    });
  },
  text3 : function(x,y){
    $canvas1.drawText({
      fillStyle: "#000000",   fontSize:(1/4)*canvas1.height,    fontFamily:"Arial", layer:true,
     x: x, y:y,
      text:" Thickness ",
      name : "text3",
    });
  },
  text4 : function(x,y){
    $canvas1.drawText({
      fillStyle: "#000000",   fontSize:(1/4)*canvas1.height,    fontFamily:"Arial", layer:true,
     x: x, y:y,
      text:" Colors ",
      name : "text4",
    });
  },
}

function initPositionForCanvas1(){
  var i = 0;
  Canvasclear.all(1);
  if((canvas1.width/(NUMofCOLOR + NUMofDRAWINGSTYLE + NUMofFUNCTION)) >= (1/4)*canvas1.height){
    for(i=0;i<(NUMofCOLOR + NUMofDRAWINGSTYLE + NUMofFUNCTION);i++){
      cirArrayX[i] = canvas1.width - ((canvas1.width/((NUMofCOLOR + NUMofDRAWINGSTYLE + NUMofFUNCTION)*2)) * ((2*i)+1))*(3/4);
    }
  }else{
    for(i=0;i<(NUMofCOLOR + NUMofDRAWINGSTYLE + NUMofFUNCTION);i++){
      cirArrayX[i] = canvas1.width - (((1/4)*canvas1.height) * ((2*i)+1))*(3/4);
    }
  }
  Circle.paint(cirArrayX[0],(1/2)*canvas1.height+10, "#DF0101");
  Circle.paint(cirArrayX[1],(1/2)*canvas1.height+10, "#FF8000");
  Circle.paint(cirArrayX[2],(1/2)*canvas1.height+10, "#FFFF00");
  Circle.paint(cirArrayX[3],(1/2)*canvas1.height+10, "#40FF00");
  Circle.paint(cirArrayX[4],(1/2)*canvas1.height+10, "#0000FF");
  Circle.paint(cirArrayX[5],(1/2)*canvas1.height+10, "#FF00BF");
  Circle.paint(cirArrayX[6],(1/2)*canvas1.height+10, "#000000");
  Circle.paint(cirArrayX[7],(1/2)*canvas1.height+10, "#F2F2F2");
  Circle.thickness(10,cirArrayX[8],(1/2)*canvas1.height+10,(3/16)*canvas1.height);
  Circle.thickness(20,cirArrayX[9],(1/2)*canvas1.height+10,(4/16)*canvas1.height);
  Circle.thickness(30,cirArrayX[10],(1/2)*canvas1.height+10,(5/16)*canvas1.height);
  Circle.save(cirArrayX[11]-10,(1/2)*canvas1.height);
  Circle.undo(cirArrayX[12]-20,(1/2)*canvas1.height);
  Circle.back(10,0);
  Text.text1();
  $canvas1.moveLayer("text1" ,0);
  Text.text3(cirArrayX[9],(1/6)*canvas1.height);
  Text.text4(cirArrayX[3],(1/6)*canvas1.height);
}

$(function(){

  sizing();
  function sizing() {
    canvas1.height = (4/30)*container.offsetHeight;
    canvas1.width = container.offsetWidth;
    initPositionForCanvas1();
    $canvas1.drawLayers();
  }

  window.addEventListener('resize', function() {
    sizing();
  });
});