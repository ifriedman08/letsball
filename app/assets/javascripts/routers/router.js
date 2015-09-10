LetsBall.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#content');
    this.collection = new LetsBall.Collections.Games();
  },

  routes: {
    'games/new': 'createNewGame'
  },

  dashboard: function () {
    alert('Dash');
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
