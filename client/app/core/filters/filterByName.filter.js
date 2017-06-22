(function() {
  'use strict';

  angular
    .module('app.core')
    .filter('filterByName', filterByName);

  /** @ngInject */
  function filterByName() {
    return function(items, name) {
      if (items.length === 0 || !name) {
        return items;
      }

      if (name.length === 0) {
        return [];
      }

      var filtered = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var match = false;
        if (item.category[0].description === name) {
          match = true;
        }

        if (match) {
          filtered.push(item);
        }

      }

      return filtered;

    };
  }

})();
