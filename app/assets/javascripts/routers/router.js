LetsBall.Routers.Router = Backbone.Router.extend({
  initialize: function() {
    this.$rootEl = $('#content');
    this.collection = new LetsBall.Collections.Games();
  },

  routes: {
    '': 'dashboard',
    'games/new': 'createNewGame',
    'games/:id': 'showGame'
  },

  dashboard: function () {
    $('#content').empty();
    $('#content').css('z-index', '-2');
    $(document).on('ready', function(){
      LetsBall.MarkerClustererObj = new MarkerClusterer(map, LetsBall.allMarkers);
    })
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
  //
  showGame: function (gameId) {
    alert(gameId);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});
