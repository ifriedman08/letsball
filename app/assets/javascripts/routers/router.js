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
    $('#content').css('z-index', '-2');
  },

  createNewGame: function () {
    if (!LetsBall.current_user.id) {
      window.location.href = 'session/new';
    } else {
      var that = this;
      var newGame = new LetsBall.Models.Game();
      var newGameForm = new LetsBall.Views.NewGame({
        model: newGame,
        collection: that.collection
      });
      $('#content').css('z-index', '7');
      this.$rootEl.html(newGameForm.$el);
      newGameForm.render();
    }
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
