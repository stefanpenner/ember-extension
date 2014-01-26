function accountForScrollbar() {
  /*jshint validthis:true */

  var outside = this.$('.list-tree').innerWidth();
  var inside = this.$('.ember-list-container').innerWidth();
  this.$('.spacer').width(outside - inside);
}

export default Ember.View.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, accountForScrollbar);
  }
});
