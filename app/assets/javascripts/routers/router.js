LetsBall.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#content');
    this.collection = new LetsBall.Collections.Games();
  },

  routes: {
    '': 'dashboard',
    'games/new': 'createNewGame'
  },

  dashboard: function () {
    $('#content').empty();
    var mapDiv = $("<div id='map'>");
    $('#content').append(mapDiv);
    $('#map').css('opacity', 0);
    $('#content').spin();

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        // center: {lat: -34.397, lng: 150.644},
        zoom: 12,
        disableDefaultUI: true,
      });
      // var infoWindow = new google.maps.InfoWindow({map: map});

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // infoWindow.setPosition(pos);
          // infoWindow.setContent('.');
          map.setCenter(pos);
        }, function() {
          // handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
      }

      map.addListener('tilesloaded', function() {
        $('#content').spin(false);
        $('#map').css('opacity', 1);
      });
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
    }

    var styles = [
    {
      stylers: [
        { saturation: -70 },
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
  ];
    initMap();
    map.setOptions({styles: styles});
    var allGames = new LetsBall.Collections.Games();
    var setMarkers = function () {
      allGames.each( function (game) {
        var lat = game.attributes.latitude;
        var long = game.attributes.longitude;
        var marker = new google.maps.Marker({
          position: {lat: lat, lng: long},
          map: map,
          title: 'Level-'+ game.attributes.level +' '+game.attributes.sport
        });
      });
    };
    allGames.fetch({
      success: setMarkers
    });


  },

  createNewGame: function () {
    if (!LetsBall.current_user.id) {
      window.location.href = 'session/new';
    } else {
      // LetsBall.map = $('#map');
      var that = this;
      var newGame = new LetsBall.Models.Game();
      var newGameForm = new LetsBall.Views.NewGame({
        model: newGame,
        collection: that.collection
      });
      this._swapView(newGameForm);
    }
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
