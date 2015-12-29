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
      marker.addListener('mouseout', function () {
        $('div.prev-container').remove();

      });
      LetsBall.MarkerClustererObj = new MarkerClusterer(map, LetsBall.allMarkers);
      marker.addListener('mouseover', function () {
        var game = new LetsBall.Models.Game({id: this.gameId});
        game.fetch({
          success: function() {
            $('body').append('div.prev-container');
            // $('div.prev-container').css({ })
            console.log('appended');
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

  marker.addListener('mouseover', function (event) {
    var game = new LetsBall.Models.Game({id: this.gameId});
    that = event
    game.fetch({
      success: function(arg) {
        var previewContainerEl = $("<div class='prev-container'>")
        $('body').append(previewContainerEl);
        console.log('appended: ' + "pageX: " + cursorX + ", pageY: " + cursorY );
        var height = 170;
        date = new Date(arg.attributes.time);
        console.log(arg.attributes);
        $('div.prev-container').html(
          'Level : ' + arg.attributes.level + '<br>' + arg.attributes.sport + '<br>' + date.toDateString() + '<br>@ ' + date.toLocaleTimeString()
        );
        tester = arg;
        $('div.prev-container').css({
          'width':'200px',
          'background-color':'white',
          'z-index':'999999',
          'border':'solid 2px black',
          'height': height + 'px',
          'position':'absolute',
          'top':cursorY - height,
          'left':cursorX
        })
      }
    });
  });
  marker.addListener('mouseout', function () {
    $('div.prev-container').remove();
  });
}

LetsBall.addAllMarkers = function () {
  LetsBall.allGames.each(function (game) {
    LetsBall.addMarker(game, false)
  })
  LetsBall.MarkerClustererObj = new MarkerClusterer(map, LetsBall.allMarkers);
}
