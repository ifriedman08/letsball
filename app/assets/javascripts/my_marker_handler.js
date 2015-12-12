LetsBall.setupNewGame = function () {
  var newGame = new LetsBall.Models.Game();
  var place = autocomplete.getPlace();
  var latitude = place.geometry.location.lat();
  var longitude = place.geometry.location.lng();
  var place_name = place.name;
  var now = new Date();
  var tzo = now.getTimezoneOffset();
  newGame.set({
    'latitude': latitude,
    'longitude': longitude,
    'place_name': place_name,
    'time': new Date($('.date-input').val()+ ' ' + $('.time-input').val()),
    'sport': $('.select-sport').val(),
    'level': $('.select-level').val(),
    'user_id': LetsBall.current_user.id,
    'byob': $('.byob-box').prop('checked'),
    'show_number': $('.show-phone-box').prop('checked')
  });
  return newGame;
}

LetsBall.saveGame = function (event) {
  event.preventDefault();
  var newGame = LetsBall.setupNewGame();
  newGame.save({},{
    success: function () {
      Backbone.history.navigate('', {trigger: true});
      var lat = newGame.attributes.latitude;
      var long = newGame.attributes.longitude;
      var gameId = newGame.attributes.id;
      var marker = new google.maps.Marker({
        gameId: gameId,
        position: {lat: lat, lng: long},
        map: map,
        title: 'Level-'+ newGame.attributes.level +' '+newGame.attributes.sport,
        animation: google.maps.Animation.DROP
      });
      LetsBall.allMarkers.push(marker);
      LetsBall.MarkerClustererObj = new MarkerClusterer(map, LetsBall.allMarkers);
      marker.addListener('mouseout', function () {
        $('.prev-container').empty();
        $('.prev-container').html("<br><br><br><br>Hover over the markers to show game info.<br>Click them for more details.");
      });
      marker.addListener('mouseover', function () {
        var game = new LetsBall.Models.Game({id: this.gameId});
        game.fetch({
          success: function() {
            LetsBall.showGamePrev(game);
          }
        });
      });
     }
  });
  console.log('fetching all games');
  LetsBall.allGames.fetch();
}

LetsBall.addMarker = function (game, drop) {
  // var lat = game.attributes.latitude;
  // var long = game.attributes.longitude;
  // var gameId = game.get('id');
  var marker = new google.maps.Marker({
    gameId: game.get('id'),
    position: {lat: game.attributes.latitude, lng: game.attributes.longitude},
    map: map,
    title: 'Level-'+ game.attributes.level +' '+game.attributes.sport,
  });
  LetsBall.allMarkers.push(marker);
  marker.addListener('mouseout', function () {
    $('.prev-container').empty();
    $('.prev-container').html("<br><br><br><br>Hover over the markers to show game info.<br>Click them for more details.");
  })
  marker.addListener('mouseover', function () {
    var game = new LetsBall.Models.Game({id: this.gameId});
    game.fetch({
      success: function() {
        LetsBall.showGamePrev(game);
      }
    })
  });
}

LetsBall.addAllMarkers = function () {
  LetsBall.allGames.each(function (game) {
    LetsBall.addMarker(game, false)
  })
  LetsBall.MarkerClustererObj = new MarkerClusterer(map, LetsBall.allMarkers);
}
