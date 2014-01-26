var get = Ember.get;
var gt = Ember.computed.gt;
var alias = Ember.computed.alias;

export default Ember.ObjectController.extend({
  needs: 'route-tree',

  rootTree: alias('controllers.root-tree'),
  details: null,

  withDetails: false,

  hasChildren: gt('children.length', 0),

  style: function() {
    return 'padding-left: ' + ((this.get('numParents') * 5) + 5) + 'px';
  }.property('numParents'),

  numParents: function() {
    var numParents = this.get('target.target.numParents');
    if (numParents === undefined) {
      numParents = -1;
    }
    return numParents + 1;
  }.property("target.target.numParents"),

  isCurrent: function() {
    var currentRoute = this.get('routeTree.currentRoute');
    if (!currentRoute) {
      return false;
    }
    if (this.get('value.name') === 'application') {
      return true;
    }
    var regName = this.get('value.name').replace('.', '\\.');
    return !!currentRoute.match(new RegExp('(^|\\.)' + regName + '(\\.|$)'));
  }.property('routeTree.currentRoute', 'value.name')
});
