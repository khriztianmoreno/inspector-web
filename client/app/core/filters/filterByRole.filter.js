(function() {
  'use strict';

  angular
    .module('app.core')
    .filter('filterByRole', filterByRole);

  /** @ngInject */
  function filterByRole() {
    return function(items, ids) {

      if (items.length === 0 || !ids) {
        return items;
      }

      if (ids.length === 0) {
        return [];
      }

      var filtered = [];

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var match = false;

        for (var j = 0; j < ids.length; j++) {
          var id = ids[j];
          if (item.role === id.role) {
            match = true;
            break;
          }
        }

        if (match) {
          filtered.push(item);
        }

      }

      return filtered;

    };
  }

})();
