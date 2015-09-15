LetsBall.Views.Dash = Backbone.View.extend({
  template: JST['dash'],

  render: function () {
    var that = this;
    this.collection.fetch();
    var content = this.template({});
    this.$el.html(content);
    return this;
  }
});
