$(document).ready(function() {

	function refresh() {
  	$.ajax({
	    url: window.location.pathname + "/refresh", 
	    success: function(data) {
	      var num_messages = $('div.message').length;
	   		console.log(data);
	    },
	    complete: function() {
	      setTimeout(refresh, 100000);
	    }
	  });
	};
	refresh();

});


