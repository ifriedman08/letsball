LetsBall.Views.NewGame = Backbone.View.extend({
  template: JST['games/newGameForm'],

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
        var id = newGame.get('id');
        Backbone.history.navigate('', {trigger: true});
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
    $('#content').append(content);
    return this;
  }

});
