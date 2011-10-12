(function($) {

	var defaults = {
		note: function(message) {},
		success: function(message) {},
		notice: function(message) {},
		error: function(message) {},
		warning: function(message) {}
	};

	var methods = {
		init: function(options) {
			if (options) $.extend(defaults, options);
		},
		note: function(message) {},
		success: function(message) {},
		notice: function(message) {},
		error: function(message) {},
		warning: function(message) {}
	};

	$.fn.notice = function(method) {
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

})(jQuery);

