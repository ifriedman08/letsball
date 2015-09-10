LetsBall.Views.NewGame = Backbone.View.extend({
  template: JST['games/newGameForm'],

  events: {
    'click button.submit-game': 'saveGame',
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
        var id = newGame.get('id');
        Backbone.history.navigate('games/'+id, {trigger: true});
      }
    });
  },

  render: function () {
    var that = this;
    var content = this.template({ });

    this.$el.html(content);
    return this;
  }

});
