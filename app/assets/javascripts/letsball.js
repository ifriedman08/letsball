window.LetsBall = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  isShowingCluster: false,
  initialize: function () {
    // LetsBall.showGamePrev = function(game) {
    //   if (game.get('level') === 1) {
    //     var gameLevel = 'Light';
    //   } else if (game.get('level') === 2) {
    //     var gameLevel = 'Fast';
    //   } else if (game.get('level') === 3) {
    //     var gameLevel = 'Expert';
    //   }
    //   var gameTime = new Date(game.get('time'));
    //   $('div.prev-container').empty();
    //   var gamePrev = $("<div class='prev'>");
    //   var gameType = $("<h2>" + game.get('sport') + ", Level: " + game.get('level')+ " (" + gameLevel + ")" + "</h2>");
    //   gamePrev.append(gameType);
    //   var gameLoc = $("<p>" + game.get('place_name') + "</p>");
    //   gamePrev.append(gameLoc);
    //   var gameTimeInfo = $("<p>" + gameTime.toDateString() + "<br> @ " + gameTime.toTimeString().slice(0,5) + "</p>");
    //   gamePrev.append(gameTimeInfo);
    //   if (game.get('byob')) {
    //     gamePrev.append("<p> Bring your own ball </p>");
    //   }
    //   $('.prev-container').append(gamePrev);
    // };
    var router = new LetsBall.Routers.Router();
    Backbone.history.start();
    //  LetsBall.current_user = new LetsBall.Models.User({id: LetsBall.CURRENT_USER.id});
    //  LetsBall.current_user.fetch();
  }
};

// $(window.LetsBall.initialize);
