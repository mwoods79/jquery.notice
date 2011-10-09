(function( $ ){

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  var templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  var template = function(str, data) {
    var c  = _.templateSettings;
    var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str.replace(/\\/g, '\\\\')
         .replace(/'/g, "\\'")
         .replace(c.escape, function(match, code) {
           return "',_.escape(" + code.replace(/\\'/g, "'") + "),'";
         })
         .replace(c.interpolate, function(match, code) {
           return "'," + code.replace(/\\'/g, "'") + ",'";
         })
         .replace(c.evaluate || null, function(match, code) {
           return "');" + code.replace(/\\'/g, "'")
                              .replace(/[\r\n\t]/g, ' ') + "__p.push('";
         })
         .replace(/\r/g, '\\r')
         .replace(/\n/g, '\\n')
         .replace(/\t/g, '\\t')
         + "');}return __p.join('');";
    var func = new Function('obj', tmpl);
    return data ? func(data) : func;
  };

  var methods = {
     init : function( options ) {

       return this.each(function(){

         var $this = $(this),
             data = $this.data('tooltip'),
             tooltip = $('<div />', {
               text : $this.attr('title')
             });

         // If the plugin hasn't been initialized yet
         if ( ! data ) {

           /*
             Do more setup stuff here
           */

           $(this).data('tooltip', {
               target : $this,
               tooltip : tooltip
           });

         }
       });
     },
     destroy : function( ) {

       return this.each(function(){

         var $this = $(this),
             data = $this.data('tooltip');

         // Namespacing FTW
         $(window).unbind('.tooltip');
         data.tooltip.remove();
         $this.removeData('tooltip');

       })
     },


     reposition : function( ) { // ... },
     show : function( ) { // ... },
     hide : function( ) { // ... },
     update : function( content ) { // ...}
  };

  $.fn.notify = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.notify' );
    }
  };

})( jQuery );

