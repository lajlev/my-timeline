$(function(){
  var t = new Trianglify({x_gradient: Trianglify.colors, cellsize: 105, cellpadding: 90})
  var pattern = t.generate( $('body').width(), $('body').height() )
  $('body').css('background-image', pattern.dataUrl)

  // Load hidden testimonials
  $('.button--more-testimonials').click(function(e){
    $('.testimonials li').removeClass('hide');
    e.preventDefault();
    $(this).hide();
  });

  // Boardgamegeek data
  $.getJSON(
    "http://c.laj.lv/parser/bgg_lajlev.php",

    function(data) {
     $('.bgg-last-3-games').removeClass('ajax-spinner').html("<a target='_blank' href='https://boardgamegeek.com/boardgame/" + data.play[0].item['@attributes'].objectid + "'>" + data.play[0].item['@attributes'].name + "</a>, <a target='_blank' href='https://boardgamegeek.com/boardgame/" + data.play[1].item['@attributes'].objectid + "'>" + data.play[1].item['@attributes'].name + "</a> & <a target='_blank' href='https://boardgamegeek.com/boardgame/" + data.play[2].item['@attributes'].objectid + "'>" + data.play[2].item['@attributes'].name + "</a>.");
    }
  );

  // IMDB ratings
  $.ajax({
    url: 'https://api.apifier.com/v1/execs/JGKtw2KAiov4LuQip/results?simplified=1',
    dataType: 'json',
    success: function(data) {
      var randomObject = data[Math.floor(Math.random() * data.length)];
      var randomObjectId = randomObject.id;

      $.ajax({
        url: 'http://omdbapi.com/?i=tt'+ randomObjectId +'&apikey=8d6c247f',
        dataType: 'json',
        success: function(data) {

          var imdbMyRating = randomObject.my_rating;
          var imdbMyRatingWord;
          var imdbTimeAgo = randomObject.date;
          var imdbId = data.imdbID;
          var imdbType = data.Type;
          var imdbYear = data.Year;
          var imdbPlot = data.Plot;
          var imdbTitle = data.Title;
          var currentDate = new Date();
          var currentYear = currentDate.getFullYear();
          // Word rating
          if(imdbMyRating < 2) {
            imdbMyRatingWord = "a crapy";
          } else if(imdbMyRating < 5){
            imdbMyRatingWord = "a sloopy";
          } else if(imdbMyRating < 6){
            imdbMyRatingWord = "a decent";
          } else if(imdbMyRating < 7){
            imdbMyRatingWord = "a pretty good";
          } else if(imdbMyRating < 8){
            imdbMyRatingWord = "a great";
          } else if(imdbMyRating < 9){
            imdbMyRatingWord = "an awesome";
          } else {
            imdbMyRatingWord = "a briliant";
          }

          if(imdbType == "series") {
            imdbType = "TV serie";
          }

          // Improve copy if imdbTimeAgo don't contain time ago
          if(!((imdbTimeAgo.substr(imdbTimeAgo.length - 3)) == "ago")) {
            var imdbTimeYear = imdbTimeAgo.substr(imdbTimeAgo.length - 4);
            var imdbTimeAgoYear = currentYear - imdbTimeYear;
            imdbTimeAgo = imdbTimeAgoYear + ' years ago';
          }
          // Composed imdb string
          $('.imdb-random-movie').removeClass('ajax-spinner').html("a " +imdbType + " I watched "+imdbTimeAgo + ". It's called <a target='_blank' href='http://www.imdb.com/title/" + imdbId + "' title='I rated "+imdbTitle+" "+imdbMyRating+" out of 10.'>" + imdbTitle + "</a> " + imdbMyRatingWord + " " + imdbType + " from " + imdbYear + ". Basicly it's about: " + imdbPlot);
        }
      });
    } // Success
  }); //$.ajax

  // Last.fm
  $.ajax({
    type : 'POST',
    url : 'http://ws.audioscrobbler.com/2.0/',
    data : 'method=user.gettopartists&' +
           'user=lajlev&' +
           'period=1month&' +
           'limit=3&' +
           'api_key=e122e0260c0153d515aca72b28cb91b3&' +
           'format=json',
    dataType : 'jsonp',
    success : function(data) {
      //console.log(data);
      var artist = data.topartists.artist;
      $('.lastfm-top3-month').removeClass('ajax-spinner').html("<a href='"+artist[0].url+"'>" + artist[0].name + "</a>, <a href='"+artist[1].url+"'>" + artist[1].name + "</a> & <a href='"+artist[2].url+"'>" + artist[2].name + "</a>,"  );
    }, // Success
    error : function(code, message){
      console.log("error");
    }
  }); // $.ajax
}); // $.Ready