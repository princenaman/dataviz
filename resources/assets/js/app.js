// All AJAX Calls to pass from here //
function remoteAction(url, method, data, callback, errorCallback) {
	$.ajax({
	    type: method,
	    url: url,
	    data: data,
	    success: function(response) {
            if (typeof callback == 'function')
                callback(response);
        },
        error: function(response) {
            if (typeof errorCallback == 'function')
                errorCallback(response);
        }
	});
}

$(window).ready(function() {
    $('#loading').hide();
});

function loading(){
		$('#loading').show();
}

function stopLoading(){
		$('#loading').hide();
}

// Get URL Params
function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
}
