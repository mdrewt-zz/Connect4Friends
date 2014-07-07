$(document).ready(function() {

	var Conversation = function() {
	}

	Conversation.prototype.count_messages = function() {
		return $('div.message').length;
	}

	Conversation.prototype.refresh = function() {
		var num = Conversation.prototype.count_messages();
		$.ajax({
			type: "POST",
			dataType: "json",
			data: { num_messages : num },
			url: window.location.pathname + "/refresh",
			success: function(data) {
				console.log(data.length);
				for (i = 0; i < data.length; i++) {
					$('#conversation').append("<div class='message'>" + data[i].message.content + "</div><br>");
				}
			},
			complete: function() {
	      setTimeout(Conversation.prototype.refresh, 100);
	    }
		});
	}

	var convo = new Conversation();
	convo.refresh();

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


