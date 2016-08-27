$(function(){
  var t = new Trianglify({x_gradient: Trianglify.colors, cellsize: 105, cellpadding: 90})
  var pattern = t.generate( $('body').width(), $('body').height() )
  $('body').css('background-image', pattern.dataUrl)
})