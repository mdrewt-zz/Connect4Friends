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

	$('#new_message').on("submit", function(e) {
		e.preventDefault();
		var new_message = $('#new_message :input').val();
		$('#conversation').append("<div class='message'>" + new_message + "</div><br>");
		$.ajax({
			url: window.location.pathname,
			type: "POST",
			dataType: "string",
			data: { new_message : new_message },
			success: function(data) {
			}
		});
	});

});


