export default Ember.View.extend({
  classNames: ['split'],
  classNameBindings: ['controller.collapsed:split_state_collapsed']
});
