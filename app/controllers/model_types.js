export default Ember.ArrayController.extend({
  collapsed: Ember.computed.bool('selected')
});
