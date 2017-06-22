(function() {
  'use strict';

  angular
    .module('app.core')
    .filter('filterByCategorie', filterByCategorie);

  /** @ngInject */
  function filterByCategorie() {
    return function(items, tags) {
      if (items.length === 0 || tags.length === 0) {
        return items;
      }

      var filtered = [];

      items.forEach(function(item) {
        var match = tags.every(function(tag) {
          var tagExists = false;
          if (item.categorie === tag.name) {
            tagExists = true;
          }

          return tagExists;
        });

        if (match) {
          filtered.push(item);
        }
      });

      return filtered;
    };
  }

})();
