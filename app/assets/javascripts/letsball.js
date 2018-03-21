window.LetsBall = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  isShowingCluster: false,
  filters: {},
  sports_arr: [ 'Basketball', 'Soccer', 'Football', 'Tennis', 'Kickball', 'Baseball', 'Frisbee', 'Rugby', 'Quidditch' ].sort(),
  initialize: function () {
    var router = new LetsBall.Routers.Router();
    Backbone.history.start();
  }
};

// $(window.LetsBall.initialize);
