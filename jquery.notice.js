(function($) {

	var defaults = {
		note: null,
		success: null,
		notice: null,
		error: null,
		warning: null
	};

	var methods = {
		init: function(options) {
			if (options) $.extend(defaults, options);
		},

		display: function(klass, message) {
			var $element = $(_getHtmlString(klass, message));
			$(this).each(function() {
				$(this).append($element);
			});
			return $element;
		},

		remove: function(klass, message) {
			return $(this).each(function() {
				$("." + klass + ":contains(" + message + ")").remove();
			});
		}
	};

	var _error = function(method) {
		return $.error('Method ' + method + ' does not exist on jquery.notice');
	}

	var _getHtmlString = function(klass, message) {
		if (defaults[klass] !== null && typeof defaults[klass] === "function") {
			return defaults[klass]({
				css: klass,
				message: message
			})
		}

		else if (typeof defaults[klass] !== "undefined") {
			return "<p class='" + klass + "'>" + message + "</p>"
		}

		return _error(klass);
	};

	$.fn.notice = function(method) {
		// Method calling logic
		if (methods[method] && typeof methods[method] === "function") {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			return _error(method);
		}
	};

})(jQuery);

