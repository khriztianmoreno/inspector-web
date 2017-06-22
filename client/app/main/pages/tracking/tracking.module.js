(function() {
  'use strict';

  angular
    .module('app.pages.tracking', ['ui.sortable'])
    .config(config)
    .run(run);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    $stateProvider
    // Board
    .state('app.seguimiento', {
      url: '/pages/seguimiento',
      views: {
        'content@app': {
          templateUrl: 'app/main/pages/tracking/tracking.html',
          controller: 'BoardViewController as vm'
        }
      },
      resolve: {
        Providers: function($http, ApiEndpoint) {
          return $http.get(ApiEndpoint.customers.uri + ApiEndpoint.customers.providers);
        },
        BoardData: function($http, ApiEndpoint) {
          return $http.get(ApiEndpoint.trackings.uri);
        },
        BoardList: function (msApi)
        {
            return msApi.resolve('scrumboard.boardList@get');
        }
      }
    });



    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pages/tracking');

    // Api
    msApiProvider.register('scrumboard.boardList', ['app/data/scrumboard/board-list.json']);
    msApiProvider.register('scrumboard.board', ['app/data/scrumboard/boards/32gfhaf2.json']);

  }

  /** @ngInject */
  function run(editableThemes) {
    /**
     * Inline Edit Configuration
     * @type {string}
     */
    editableThemes.default.submitTpl = '<md-button class="md-icon-button" type="submit" aria-label="save"><md-icon md-font-icon="icon-checkbox-marked-circle" class="md-accent-fg md-hue-1"></md-icon></md-button>';
    editableThemes.default.cancelTpl = '<md-button class="md-icon-button" ng-click="$form.$cancel()" aria-label="cancel"><md-icon md-font-icon="icon-close-circle" class="icon-cancel"></md-icon></md-button>';
  }

})();
