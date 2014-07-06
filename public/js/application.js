$(document).ready(function() {

	function refresh() {
  	var num_messages = $('div.message').length;
  	$.ajax({
  		type: "POST",
  		dataType: "json",
  		data: { num_messages : num_messages },
	    url: window.location.pathname + "/refresh", 
	    success: function(data) {
	    	for (i = 0; i < data.length; i++) {
	    		$('#conversation').append("<div class='message'>" + data[i].message.content + "</div><br>");
	    	}	   		
	    },
	    complete: function() {
	      setTimeout(refresh, 10000);
	    }
	  });
	};
	refresh();

	// 	// $('#chat').on("submit", function(e) {
// 	// 	var pathname = window.location.pathname;
// 	// 	console.log(pathname);
// 	// 	e.preventDefault();
// 	// 	$.ajax({
// 	// 		url: pathname,
// 	// 		type: "POST",
// 	// 		dataType: "string".
// 	// 		success: function(data) {
// 	// 			$()
// 	// 		}
// 	// 	});


});


