window.LetsBall = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
    LetsBall.showGamePrev = function(game) {
      var gamePrev = $("<div id=prev>");
      gamePrev.html(game.get('sport'));
      $('body').append(gamePrev);
      debugger

    };
    var router = new LetsBall.Routers.Router();
    Backbone.history.start();
    //  LetsBall.current_user = new LetsBall.Models.User({id: LetsBall.CURRENT_USER.id});
    //  LetsBall.current_user.fetch();
  }
};

// $(window.LetsBall.initialize);
