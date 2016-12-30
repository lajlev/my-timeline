$(function(){
  var t = new Trianglify({x_gradient: Trianglify.colors, cellsize: 105, cellpadding: 90})
  var pattern = t.generate( $('body').width(), $('body').height() )
  $('body').css('background-image', pattern.dataUrl)

  $('.button--more-testimonials').click(function(e){
    $('.testimonials li').removeClass('hide');
    e.preventDefault();
    $(this).hide();
  });

  $.getJSON(
    "http://c.laj.lv/parser/bgg_lajlev.php",

    function(data) {
     $('.bgg-last-3-games').html(data.play[0].item['@attributes'].name + ", " + data.play[1].item['@attributes'].name + " & " + data.play[2].item['@attributes'].name);
    }
  );



})