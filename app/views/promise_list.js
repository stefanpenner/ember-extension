import PromiseItemView from "views/promise_item";

export default Ember.ListView.extend({
  classNames: ["list-tree"],

  appHeight: Ember.computed.alias('controller.controllers.application.height'),

  height: function() {
    var filterHeight = 22,
        headerHeight = 30,
        appHeight = this.get('appHeight');

    return appHeight - filterHeight - headerHeight;
  }.property('appHeight'),
  rowHeight: 30,
  itemViewClass: PromiseItemView
});
