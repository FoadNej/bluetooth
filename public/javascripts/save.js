var socket = io.connect('http://' + location.host + '/');

function Send_Data(userName,num,data, image, address){
    socket.emit('save one data',userName,num,data, image, address);
}

$(function(){

    userName = 'Ryu';

    console.log("User is " + userName);

    socket.on('connect', function(msg) {
        socket.emit('load pictures',userName);
    });

    $(window).on("beforeunload", function() {
        socket.emit("save all pictures", userName,memoryCanvasArray);
    });

    socket.on('open pictures', function(data){
        imgArray[0].onload = function(){
            imgArray[0].width = $gallery.width()*(3/4);
            picture[0].appendChild(imgArray[0]);
         };
         imgArray[0].src = data.place1;

        imgArray[1].onload = function(){
            imgArray[1].width = $gallery.width()*(3/4);
            picture[1].appendChild(imgArray[1]);
         };
         imgArray[1].src = data.place2;

        imgArray[2].onload = function(){
            imgArray[2].width = $gallery.width()*(3/4);
            picture[2].appendChild(imgArray[2]);
         };
         imgArray[2].src = data.place3;

        imgArray[3].onload = function(){
            imgArray[3].width = $gallery.width()*(3/4);
            picture[3].appendChild(imgArray[3]);
         };
         imgArray[3].src = data.place4;

        imgArray[4].onload = function(){
            imgArray[4].width = $gallery.width()*(3/4);
            picture[4].appendChild(imgArray[4]);
         };
         imgArray[4].src = data.place5;

        memoryCanvasArray = [data.picture1,data.picture2,data.picture3,data.picture4,data.picture5];
    });

});
