(function() {
  'use strict';

  angular
    .module('app.administracion', [
      'flow',
      'vAccordion',
      'color.picker',
      'xeditable',
      'mdColorPicker',
      'vAccordion',
      'scrollable-table',
    ])
    .config(config);

  /** @ngInject */
  function config($stateProvider, $translatePartialLoaderProvider, msApiProvider, msNavigationServiceProvider) {
    // State
    $stateProvider
      .state('app.administracion', {
        abstract: true,
        url: '/administracion'
      })
      .state('app.administracion.vehiculos', {
        url: '/vehiculos',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/vehiculos/vehiculos.html',
            controller: 'AdminVehiculosController as vm'
          }
        },
        resolve: {
          vehiclesData: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.vehicles.uri + ApiEndpoint.vehicles.page + ApiEndpoint.vehicles.limit);
          }
        },
        bodyClass: 'administracion-vehiculos'
      })
      .state('app.administracion.vehiculos.upload', {
        url: '/cargar/',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/vehiculos/upload/upload.html',
            controller: 'UploadVehiclesController as vm'
          }
        },
        bodyClass: 'vehiculos--upload'
      })
      .state('app.administracion.vehiculos.detail', {
        url: '/:id',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/vehiculo/vehiculo.html',
            controller: 'VehicleDetailController as vm'
          }
        },
        resolve: {
          Vehicle: function($http, ApiEndpoint, $stateParams) {
            return $http.get(ApiEndpoint.vehicles.uri + '/' + $stateParams.id);
          },
          Brands: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/brands');
          },
          Lines: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/line');
          },
          Classes: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/class');
          },
          Documents: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/documents');
          }
        },
        bodyClass: 'detalles-vehiculo'
      })
      .state('app.administracion.vehiculos.create', {
        url: '/crear/',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/vehiculo/vehiculoCrear/crear.html',
            controller: 'AdminVehiculoCrearController as vm'
          }
        },
        resolve: {
          Brands: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/brands');
          },
          Lines: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/line');
          },
          Classes: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/class');
          },
          Documents: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/documents');
          }
        },
        bodyClass: 'vehiculo-crear'
      })
      .state('app.administracion.clientes', {
        url: '/clientes',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/clientes/clientes.html',
            controller: 'CustomerController as vm'
          }
        },
        resolve: {
          Customers: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.customers.uri)
          }
        },
        bodyClass: 'administracion-clientes'
      })
      .state('app.administracion.clientes.crear', {
        url: '/crear',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/clientes/dialogs/index.html',
            controller: 'CustomerDialogController as vm'
          }
        },
        resolve: {
          Customers: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.customers.uri)
          }
        },
        bodyClass: 'administracion-clientes'
      })
      .state('app.administracion.usuarios', {
        url: '/usuarios',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/usuarios/usuarios.html',
            controller: 'UsersController as vm'
          }
        },
        resolve: {
          Contacts: function(msApi) {
            return msApi.resolve('contacts.contacts@get');
          },
          User: function(msApi) {
            return msApi.resolve('contacts.user@get');
          },
          Users: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.users.uri + ApiEndpoint.users.my)
          }
        },
        bodyClass: 'administracion-usuarios'
      })
      .state('app.administracion.usuarios.new', {
        url: '/nuevo',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/usuarios/usuarios.html',
            controller: 'UsersController as vm'
          }
        },
        resolve: {
          Contacts: function(msApi) {
            return msApi.resolve('contacts.contacts@get');
          },
          User: function(msApi) {
            return msApi.resolve('contacts.user@get');
          },
          Users: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.users.uri + ApiEndpoint.users.my)
          }
        },
        onEnter: function($mdDialog, $document) {
          $mdDialog.show({
              controller         : 'UserDialogController',
              controllerAs       : 'vm',
              templateUrl        : 'app/main/pages/administracion/views/usuarios/dialogs/user/user-dialog.html',
              parent             : angular.element($document.find('#content-container')),
              targetEvent        : null,
              clickOutsideToClose: true,
              locals             : {
                  Contact : null,
                  Contacts: [],
              }
          });
        }
      })
      .state('app.administracion.inspecciones', {
        url: '/inspecciones',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/inspecciones/inspecciones.html',
            controller: 'AdminInspeccionesController as vm'
          }
        },
        resolve: {
          InspectionData: function($http, ApiEndpoint, $stateParams) {
            return $http.get(ApiEndpoint.inspections.uri);
          }
        },
        bodyClass: 'inspecciones'
      })
      .state('app.administracion.inspecciones.create', {
        url: '/crear',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/inspeccion/create/create.html',
            controller: 'CreateInspeccionController as vm'
          }
        },
        resolve: {
          InspectionTypes: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/inspectionType');
          },
          AnswerTypes: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/answerTypes');
          },
          AnswerValues: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/answerValues');
          }
        },
        bodyClass: 'detalles-inspeccion'
      })
      .state('app.administracion.inspecciones.detail', {
        url: '/:id',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/inspeccion/index.html',
            controller: 'InspectionController as vm'
          }
        },
        resolve: {
          Inspection: function($http, ApiEndpoint, $stateParams) {
            return $http.get(ApiEndpoint.inspections.uri + '/' + $stateParams.id);
          },
          InspectionTypes: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/inspectionType');
          },
          AnswerTypes: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/answerTypes');
          },
          AnswerValues: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/answerValues');
          }
        },
        bodyClass: 'detalles-inspeccion'
      })
      .state('app.administracion.centro-alertas', {
        url: '/centro-alertas',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/centro-alertas/index.html',
            controller: 'WarningCenterController as vm'
          }
        },
        resolve: {
          Warnings: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.warningCenter.uri);
          },
          Classes: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/class');
          },
          Documents: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/documents');
          }
        },
        bodyClass: 'warning-center'
      })
      .state('app.administracion.providers', {
        url: '/providers',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/providers/index.html',
            controller: 'ProviderController as vm'
          }
        },
        resolve: {
          Providers:function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.customers.uri + ApiEndpoint.customers.providers);
          }
        },
        bodyClass: 'administracion-providers'
      })
      .state('app.administracion.providers.create', {
        url: '/create',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/providers/create/create.html',
            controller: 'ProviderCreateController as vm'
          }
        },
        resolve: {
          ServicesType: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/serviceType');
          }
        },
        bodyClass: 'administracion-providers'
      })
      .state('app.administracion.providers.edit', {
        url: '/:id',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/providers/edit/edit.html',
            controller: 'ProviderEditController as vm'
          }
        },
        resolve: {
          Provider: function($http, ApiEndpoint, $stateParams, Auth) {
            if($stateParams.id){
              return $http.get(ApiEndpoint.customers.uri + '/' + $stateParams.id);
            } else{
              var currentUser = Auth.getCurrentUser();
              return $http.get(ApiEndpoint.customers.uri + '/' + currentUser.customer.localId);
            }
          },
          MyUsers: function($http, ApiEndpoint, $stateParams, Auth) {
            if($stateParams.id){
              return $http.get(ApiEndpoint.users.uri + ApiEndpoint.users.byProviders + $stateParams.id);
            } else {
              var currentUser = Auth.getCurrentUser();
              return $http.get(ApiEndpoint.users.uri + ApiEndpoint.users.byProviders + currentUser.customer.localId);
            }
          },
          Headquarters: function($http, ApiEndpoint, $stateParams, Auth) {
            if($stateParams.id){
              var url = ApiEndpoint.customers.uri + '/provider/' + $stateParams.id + '/headquartes';
              return $http.get(url);
            } else {
              var currentUser = Auth.getCurrentUser();
              var url = ApiEndpoint.customers.uri + '/provider/' + currentUser.customer.localId + '/headquartes';
              return $http.get(url);
            }

            return null;
          },
          ServicesType: function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/serviceType');
          }
        },
        bodyClass: 'administracion-providers'
      })
      .state('app.administracion.promotions', {
        url: '/promotions',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/promotions/promotions.html',
            controller: 'PromotionsController as vm'
          }
        },
        resolve: {
          Promotions:function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.promotions.uri);
          }
        },
        bodyClass: 'administracion-promotions'
      })
      .state('app.administracion.promotions.add', {
        url: '/add',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/promotions/add/add.html',
            controller: 'PromotionAddController as vm'
          }
        },
        resolve: {
          Countries:function($http) {
            return $http.get('https://restcountries.eu/rest/v1/all');
          },
          Categories:function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/serviceType');
          },
        },
        bodyClass: 'administracion-promotions'
      })
      .state('app.administracion.promotions.edit', {
        url: '/:id',
        views: {
          'content@app': {
            templateUrl: 'app/main/pages/administracion/views/promotions/edit/edit.html',
            controller: 'PromotionEditController as vm'
          }
        },
        resolve: {
          Promotion:function($http, ApiEndpoint, $stateParams) {
            return $http.get(ApiEndpoint.promotions.uri + '/' + $stateParams.id);
          },
          Countries:function($http) {
            return $http.get('https://restcountries.eu/rest/v1/all');
          },
          Categories:function($http, ApiEndpoint) {
            return $http.get(ApiEndpoint.systemvalues.uri + '/serviceType');
          },
        },
        bodyClass: 'administracion-promotions'
      });

    // Translation
    $translatePartialLoaderProvider.addPart('app/main/pages/administracion');

    // Api
    msApiProvider.register('contacts.contacts', ['app/data/contacts/contacts.json']);
    msApiProvider.register('contacts.user', ['app/data/contacts/user.json']);

    msApiProvider.register('inspections.tasks', ['app/data/inspections/tasks.json']);
    msApiProvider.register('inspections.tags', ['app/data/inspections/tags.json']);
    //
    msApiProvider.register('scrumboard.boardList', ['app/data/scrumboard/board-list.json']);
    msApiProvider.register('scrumboard.board', ['app/data/scrumboard/boards/:id.json']);
  }
})();
