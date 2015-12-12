LetsBall.Views.NewGame = Backbone.View.extend({
  template: JST['games/newGameForm'],

  initialize: function () {
    // $('div.background').onClick('click', this.closeForm);
  },

  events: {
    'click button.submit-game': 'saveGame',
    'click div.background': 'closeForm'
  },

  saveGame: function (event) {
    event.preventDefault();
    LetsBall.saveGame(event);
  },

  closeForm: function (event) {
    event.preventDefault();
    Backbone.history.navigate('', {trigger: true});
  },

  render: function () {
    var that = this;
    var content = this.template({ });
    this.$el.html(content);
    return this;
  }
});
