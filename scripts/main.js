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
     $('.bgg-last-3-games').html("<a target='_blank' href='https://boardgamegeek.com/boardgame/" + data.play[0].item['@attributes'].objectid + "'>" + data.play[0].item['@attributes'].name + "</a>, <a target='_blank' href='https://boardgamegeek.com/boardgame/" + data.play[1].item['@attributes'].objectid + "'>" + data.play[1].item['@attributes'].name + "</a> & <a target='_blank' href='https://boardgamegeek.com/boardgame/" + data.play[2].item['@attributes'].objectid + "'>" + data.play[2].item['@attributes'].name + "</a>");
    }
  );



})