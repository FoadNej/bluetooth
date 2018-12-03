var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();



var fs = require('fs');
var mkdirp = require("mkdirp");
var base64 = require('urlsafe-base64');
var getDirName = require("path").dirname

function writeFile (path, contents, cb) {
  console.log("Save image to DB");
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err)
      fs.writeFile(path, contents, cb);
  })
}





//added for express generator socketio
var io = require("socket.io")();
app.io = io;

//event management
io.on('connection', function(socket){

  io.clients(function(error, clients){
    if (error) throw error;
    console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
  });
  //
  //socket.emit('rasp connect', { some: 'data' });
  //console.log('connected');
  //raspberry introduces itself, and is joined to a room with its id
  
  socket.on('home load', function(data){
    socket.join(data.room);
    console.log(data.room);
    console.log('joined home room');

  });

  socket.on('new person', function(data){
    console.log(data);
    console.log(data.room);
    //socket.join(data.room);
    io.to(data.room).emit('welcome', { name: data.name });
    //socket.broadcast.to(data.raspID).emit("boro",data);

  });


  


//event received from raspberry(console log), and send to the browser, this needs to be optimized
  socket.on('log', function(data){
    console.log(data);
    console.log(data.raspID);
    socket.join(data.raspID);
    io.to(data.raspID).emit('update log', { log: data.log });
    //socket.broadcast.to(data.raspID).emit("boro",data);

  });


  socket.on('disconnect', function(){
    console.log('disconnected');
  });



 socket.on('button load', function(data){
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('button load', { buttonNo: data.buttonNo });
    console.log(data);
  });

 socket.on('button hit', function(data){
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('button hit', { buttonNo: data.buttonNo });
  });


 socket.on('RFID start', function(data){
    socket.join(data.chatroom);
    console.log('RFID joined');

  });

 socket.on('RFID detection', function(data){
    socket.join(data.chatroom);
    io.to(data.chatroom).emit('RFID detection', { landmark: data.landmark });
    console.log(data);
    var destination = '/vr';
    io.emit('redirect', destination);
  });




  socket.on('load pictures', function(userName){
        console.log("load picturres SERVER");
        console.log("userName :" + userName);
/*        Account.findOne({"username" : userName},function(err, docs){
            socket.emit('open pictures', docs);
        });*/
    });

    socket.on('save one data', function(userName, num, data, image, address){
      switch(num){
        case 1:
/*          Account.update(
            {username : userName},
            {$set: {picture1: data }},
            function(err){  if(err)  throw err; }
          );*/
          var A = image.split(',');
          var img = base64.decode(A[1]);
          writeFile("public/" + address,img,function(err){
            if(err) throw err;
          });
/*          Account.update(
            {username : userName},
            {$set: {place1: address }},
            function(err){  if(err)  throw err; }
          );*/
          break;
        case 2:
/*          Account.update(
            {username : userName},
            {$set: {picture2: data }},
            function(err){  if(err)  throw err; }
          );*/
          var A = image.split(',');
          var img = base64.decode(A[1]);
          writeFile("public/" + address,img,function(err){
            if(err) throw err;
          });
/*          Account.update(
            {username : userName},
            {$set: {place2: address }},
            function(err){  if(err)  throw err; }
          );*/
          break;
        case 3:
/*          Account.update(
            {username : userName},
            {$set: {picture3: data }},
            function(err){  if(err)  throw err; }
          );*/
          var A = image.split(',');
          var img = base64.decode(A[1]);
          writeFile("public/" + address,img,function(err){
            if(err) throw err;
          });
/*          Account.update(
            {username : userName},
            {$set: {place3: address }},
            function(err){  if(err)  throw err; }
          );*/
          break;
        case 4:
/*          Account.update(
            {username : userName},
            {$set: {picture4: data }},
            function(err){  if(err)  throw err; }
          );*/
          var A = image.split(',');
          var img = base64.decode(A[1]);
          writeFile("public/" + address,img,function(err){
            if(err) throw err;
          });
/*          Account.update(
            {username : userName},
            {$set: {place4: address }},
            function(err){  if(err)  throw err; }
          );*/
          break;
        case 5:
/*          Account.update(
            {username : userName},
            {$set: {picture5: data }},
            function(err){  if(err)  throw err; }
          );*/
          var A = image.split(',');
          var img = base64.decode(A[1]);
          writeFile("public/" + address,img,function(err){
            if(err) throw err;
          });
/*          Account.update(
            {username : userName},
            {$set: {place5: address }},
            function(err){  if(err)  throw err; }
          );*/
          break;
      }
    });






});










var engines = require('consolidate');

app.engine('ejs', engines.ejs);
app.engine('html', require('ejs').renderFile);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

var exec = require('child_process').exec;
app.post('/api/configurewifi', function(req, res) {
    var ssid = req.body.ssid;
    var pass = req.body.pass;
    console.log(ssid);
    var cmd = 'ifconfig';
    exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
    });

    console.log("resid be post");
    res.send(ssid + ' ' + pass + ' ');
});










// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
