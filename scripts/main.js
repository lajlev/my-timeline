$(function(){
  var t = new Trianglify({x_gradient: Trianglify.colorbrewer.Oranges[9], cellsize: 250, cellpadding: 50})
  var pattern = t.generate( $('body').width(), $('body').height() )
  $('body').css('background-image', pattern.dataUrl)  
})