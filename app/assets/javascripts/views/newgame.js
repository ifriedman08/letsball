LetsBall.Views.NewGame = Backbone.View.extend({
  template: JST['games/newGameForm'],

  initialize: function () {
    // $('div.background').onClick('click', this.closeForm);
  },

  events: {
    'click button.submit-game': 'saveGame',
    'click div.background': 'closeForm'
  },

  setupGame: function () {
    var newGame = new LetsBall.Models.Game();
    var place = autocomplete.getPlace();
    var latitude = place.geometry.location.lat();
    var longitude = place.geometry.location.lng();
    var now = new Date();
    var tzo = now.getTimezoneOffset();
    newGame.set({
      'latitude': latitude,
      'longitude': longitude,
      'time': new Date($('.date-input').val()+ ' ' + $('.time-input').val()),
      'sport': $('.select-sport').val(),
      'level': $('.select-level').val(),
      'user_id': LetsBall.current_user.id,
      'byob': $('.byob-box').prop('checked'),
      'show_number': $('.show-phone-box').prop('checked')
    });
    return newGame;
  },

  saveGame: function (event) {
    event.preventDefault();
    var newGame = this.setupGame();
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
  },

  closeForm: function (event) {
    event.preventDefault();
    $('.new-game-form-div').remove();
    $('.background').remove();
  },

  render: function () {
    var that = this;
    var content = this.template({ });
    this.$el.html(content);
    return this;
  }

});
