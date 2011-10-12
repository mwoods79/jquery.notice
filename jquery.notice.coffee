$ = jQuery

defaults =
  note    : null
  success : null
  notice  : null
  error   : null
  warning : null

methods =
  init: (options) ->
    $.extend defaults, options if options

  display: (klass, message) ->
    $element = ($ _getHtmlString klass, message)
    ($ this).each () ->
      ($ this).append _getHtmlString klass, message
    $element

  remove: (klass, message) ->
    return ($ this).each () ->
      ($ ".#{klass}:contains(#{message})").remove()

_error = (method) ->
  return $.error "Method #{method} does not exist on jquery.notice"

_getHtmlString = (klass, message) ->
  return defaults[klass]({message: message}) if defaults[klass]? and typeof defaults[klass] is "function"
  return "<p class='" + klass + "'>" + message + "</p>" if typeof defaults[klass] isnt "undefined"
  _error(klass)

$.fn.notice = (method) ->

  if methods[method] and typeof methods[method] is "function"
    methods[method].apply this, Array.prototype.slice.call arguments, 1

  else if typeof method is 'object' or not method
    methods.init.apply this, arguments

  else
    _error(method)

