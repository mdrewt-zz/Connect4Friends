$(document).ready(function() {

	function refresh() {
  	var num_messages = $('div.message').length;
  	$.ajax({
  		type: "POST",
  		data: { num_messages : num_messages },
	    url: window.location.pathname + "/refresh", 
	    success: function(data) {
	   		console.log(data);
	    },
	    complete: function() {
	      setTimeout(refresh, 100000);
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


