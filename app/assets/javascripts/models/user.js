LetsBall.Models.User = Backbone.Model.extend({
  urlRoot: '/users',

  id: function () {
    if (this._id) {
      return this._id;
    } else {
      this._id = NaN;
      return this._id;
    }
  }
});
