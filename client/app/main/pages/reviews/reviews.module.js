(function() {
  'use strict';

  angular
  .module('app.inspections', ['ngFileUpload', 'ngImgCrop'])
  .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.reviews', {
        url: '/revisiones',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/reviews/index.html',
            controller: 'VehicleFindController as vm'
          }
        },
        resolve: {
          Inspections: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.inspections.uri);
          }
        },
        bodyClass: 'reviews'
      })
      .state('app.reviews.check', {
        url: '/:id',
        params: { images: [] },
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/reviews/review.html',
            controller: 'InspectionsController as vm'
          }
        },
        resolve: {
          Review: function($http, ApiEndpoint, $stateParams) {
            //api/inspections/:id
            return $http.get(ApiEndpoint.inspections.uri + '/' + $stateParams.id);
          }
        },
        bodyClass: 'reviews'
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pages/reviews');

    // Api
    msApiProvider.register('inspections.tasks', ['app/data/inspections/tasks.json']);
    msApiProvider.register('inspections.tags', ['app/data/inspections/tags.json']);


  }

})();
