window.LetsBall = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    LetsBall.showGame = function(gameId) {
      console.log(gameId);
    };
    var router = new LetsBall.Routers.Router();
    Backbone.history.start();
    //  LetsBall.current_user = new LetsBall.Models.User({id: LetsBall.CURRENT_USER.id});
    //  LetsBall.current_user.fetch();
  }
};

// $(window.LetsBall.initialize);
