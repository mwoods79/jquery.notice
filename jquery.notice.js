(function($) {


  var defaults = {
    note    : null,
success : null,
notice  : null,
error   : null,
warning : null
  };

  var methods = {
    init: function(options) {
            if (options) $.extend(defaults, options);
          },

display: function(klass, message) {
           return $(this).each(function () {
             $(this).append(getHtmlString(klass, message));
           });

         },

remove: function(klass, message) {
          return $(this).each(function () {
            $("." + klass + ":contains(" + message + ")").remove();
          });
        }
  };

  var getHtmlString = function (klass, message) {
    return (defaults[klass] !== null && typeof defaults[klass] === "function") ?
      defaults[klass]({message: message}) :
      "<p class='" + klass + "'>" + message + "</p>"
  };

  $.fn.notice = function(method) {
    // Method calling logic
    if (methods[method] && typeof methods[method] === "function") {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.tooltip');
    }
  };

})(jQuery);

