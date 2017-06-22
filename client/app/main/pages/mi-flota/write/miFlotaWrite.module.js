(function ()
{
    'use strict';

    angular
        .module('app.pages.flotaWrite', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, msApiProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
        // State
        $stateProvider.state('app.flota.write', {
            url      : '/pages/mi-flota/write',
            views    : {
                'content@app': {
                    templateUrl: 'app/main/pages/mi-flota/write/write.html',
                    controller : 'MiFlotaWriteController as vm'
                }
            },
            resolve  : {
                soatOriginsData: function($http, ApiEndpoint) {                    
                  return $http.get(ApiEndpoint.systemvalues.uri + ApiEndpoint.systemvalues.cities);
                },
                infoVehicles: function($http, ApiEndpoint) {                    
                  return $http.get(ApiEndpoint.systemvalues.uri + ApiEndpoint.systemvalues.infoVehicles);
                }
            },
            /*
            resolve  : {
                vehiclesData: function($http, ApiEndpoint) {
                  return $http.get(ApiEndpoint.vehicles.uri + ApiEndpoint.vehicles.page + ApiEndpoint.vehicles.limit);
                }
            },*/
            bodyClass: 'mi-flota-write'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/pages/mi-flota/write');

        msNavigationServiceProvider.saveItem('inspector.flota.write', {
            title    : 'Crear Flota',
            icon     : 'icon-car',
            state    : 'app.flota.write',
            translate: 'FLOTA_WRITE.FLOTA_WRITE_NAV',
            weight   : 1
        });
    }

})();
