LetsBall.Models.Game = Backbone.Model.extend({
  urlRoot: '/api/games',

  time: function () {
    if (this._time) {
      return this._time;
    } else {
      this._time = '';
      return this._time;
    }
  },

  user: function () {
    if (this._user) {
      return this._user;
    } else {
      this._user = new LetsBall.Models.User();
      return this._user;
    }
  },
});
