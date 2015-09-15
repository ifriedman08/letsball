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
    var that = this;
    var dash = new LetsBall.Views.Dash({
      collection: that.collection
    });
    this._swapView(dash);
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
      LetsBall.map = $('#map');
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
