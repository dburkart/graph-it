$(document).ready(function() {
	$('#formula-editor').focusout(function() {
		var request = $.ajax({
			url: '/plot',
			type: 'POST',
			data: {
				input: $('#formula-editor').val()
			},
		});

		request.done(function(msg) {
			$('#graph').html(msg);
		});
	});
});