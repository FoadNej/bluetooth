$(document).ready(function(){
   
    $( "#wifiForm" ).submit(function( event ) {
    	event.preventDefault();
    	var $form = $( this ),
    	ssid = $form.find( "input[name='ssid']" ).val(),
    	pass = $form.find( "input[name='pass']" ).val();
      console.log(ssid);
 
  // Send the data using post
  var posting = $.post( "api/configurewifi", { ssid: ssid, pass:pass } );
  console.log("bade post");
 
  // Put the results in a div
  posting.done(function( data ) {
    //var content = $( data ).find( "#content" );
    var content = "Please wait 15 Secs";
    console.log(data);
    $( "#result" ).empty().append(data);
  });
});





});
