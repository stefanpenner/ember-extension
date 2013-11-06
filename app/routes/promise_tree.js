import Promise from "models/promise";
var promiseArray = [];

var PromiseTreeRoute = Ember.Route.extend({

  model: function() {
    return promiseArray;
  }
});

var guid = 0;
var fakePromises = [
  {
    label: 'Find Users',
    state: 'fulfilled',
    value: '[<App.User:1>, <App.User:2>]',
    children: [
      {
        label: 'Find Comments',
        state: 'rejected',
        reason: 'HTTP STATUS 404 - NOT FOUND'
      }
    ]
  },
  {
    label: 'POST /users/',
    state: 'fulfilled',
    value: '{{"user":{"id":10,"name":"Teddy"}}',
    children: [
      {
        label: 'Sign in user',
        state: 'pending',
        value: null,
        children: [{
          label: 'Transition to user/profile/10',
          state: 'pending',
          value: null
        }]
      }
    ]
  }
];

function buildPromises(promises, parent) {
  parent = parent || null;
  var createdPromises = [];
  promises.forEach(function(promise) {
    var children = promise.children || [];
    delete promise.children;
    promise.guid = ++guid;
    promise.parent = parent;
    promise.children = [];
    var me = Promise.create(promise);
    promiseArray.pushObject(me);
    if (children.length > 0 ) {
      me.get('children').pushObjects(buildPromises(children, me));
    }
    createdPromises.pushObject(me);
  });
  return createdPromises;
}

buildPromises(fakePromises);

export default PromiseTreeRoute;
