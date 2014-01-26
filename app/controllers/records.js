var alias = Ember.computed.alias;
var none = Ember.computed.none;

export default Ember.ArrayController.extend({
  init: function() {
    this._super();
    this.set('filters', []);
    this.set('filterValues', {});
  },

  columns: alias('modelType.columns'),

  search: '',
  filters: undefined,
  filterValue: undefined,

  noFilterValue: none('filterValue'),

  actions: {
    setFilter: function(val) {
      val = val || null;
      this.set('filterValue', val);
    }
  },

  modelChanged: function() {
    this.setProperties({
      filterValue: null,
      search: ''
    });
  }.observes('model'),

  recordToString: function(record) {
    var search = '';
    var searchKeywords = Ember.get(record, 'searchKeywords');
    if (searchKeywords) {
      search = Ember.get(record, 'searchKeywords').join(' ');
    }
    return search.toLowerCase();
  },

  filtered: function() {
    var self = this, search = this.get('search'), filter = this.get('filterValue');
    return this.get('model').filter(function(item) {
      // check filters
      if (filter && !Ember.get(item, 'filterValues.' + filter)) {
        return false;
      }

      // check search
      if (!Ember.isEmpty(search)) {
        var searchString = self.recordToString(item);
        return !!searchString.match(new RegExp('.*' + escapeRegExp(search.toLowerCase()) + '.*'));
      }
      return true;
    });
  }.property('search', 'model.@each.columnValues', 'model.@each.filterValues', 'filterValue')
});

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
