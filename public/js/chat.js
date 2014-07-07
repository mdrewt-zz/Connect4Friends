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
	    		$('#conversation').append("<div class='message'>" + data[i].user + ": " + data[i].content + "</div><br>");
	    	}	   		
	    },
	    complete: function() {
	      setTimeout(refresh, 50);
	      $('#conversation').scrollTop($('#conversation').prop("scrollHeight"));
	    }
	  });
	};
	refresh();

	$('#new_message').on("submit", function(e) {
		e.preventDefault();
		var new_message = $('#new_message :input').val();
		$('#new_message')[0].reset();
		$('#conversation').append("<div class='message'>" + player.user + ": " + new_message + "</div><br>");
		$.ajax({
			url: window.location.pathname + "/chat",
			type: "POST",
			dataType: "string",
			data: { new_message : new_message },
			success: function(data) {
			}
		});
	});

});


