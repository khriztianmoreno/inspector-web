(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('Menu', Menu);

  /** @ngInject */
  function Menu(msNavigationService) {
    var service = {
      draw: draw
    };

    return service;

    //////////
    /**
     * Draw menu by role
     * @param action
     * @param parameters
     */
    function draw(role) {
      var menu = {
        'admin': function() {
          //Tablero Gerencial
          msNavigationService.saveItem('inspector', {
            title: 'INSPECTOR',
            group: true,
            weight: 1
          });

          msNavigationService.saveItem('inspector.tablero', {
            title: 'Tablero Gerencial',
            icon : 'icon-chart-line',
            state: 'app.tablero',
            translate: 'TABLERO.TABLERO_NAV',
            weight: 1
          });

          //Consolidado
          msNavigationService.saveItem('inspector.consolidado', {
            title: 'Consolidado',
            icon: 'icon-view-list',
            state: 'app.consolidado',
            translate: 'CONSOLIDADO.CONSOLIDADO_NAV',
            weight: 2
          });

          //Flota
          msNavigationService.saveItem('inspector.flota', {
            title: 'Flota',
            icon: 'icon-car',
            state: 'app.flota',
            translate: 'FLOTA.FLOTA_NAV',
            weight: 3
          });

          //informes
          msNavigationService.saveItem('inspector.informes', {
            title: 'Informes',
            icon: 'icon-file-document',
            state: 'app.informes',
            translate: 'INFORMES.INFORMES_NAV',
            weight: 4
          });

          //administracion
          msNavigationService.saveItem('admin', {
            title: 'Administracion',
            group: true,
            weight: 6
          });

          msNavigationService.saveItem('admin.clientes', {
            title: 'Clientes',
            state: 'app.administracion.clientes',
            translate: 'ADMIN.CUSTOMER_NAV',
            weight: 1
          });

          msNavigationService.saveItem('admin.usuarios', {
            title: 'Usuarios',
            state: 'app.administracion.usuarios',
            translate: 'ADMIN.USER_NAV',
            weight: 2
          });

          msNavigationService.saveItem('admin.inspecciones', {
            title: 'Inspecciones',
            state: 'app.administracion.inspecciones',
            translate: 'ADMIN.INSPECTION_NAV',
            weight: 3
          });

          msNavigationService.saveItem('admin.vehiculos', {
            title: 'Vehiculos',
            state: 'app.administracion.vehiculos',
            translate: 'ADMIN.VEHICLE_NAV',
            weight: 4
          });
        },
        'cda': function() {
          //Tablero Gerencial
          msNavigationService.saveItem('inspector', {
            title: 'INSPECTOR',
            group: true,
            weight: 1
          });

          msNavigationService.saveItem('inspector.tablero', {
            title: 'Tablero Gerencial',
            icon : 'icon-chart-line',
            state: 'app.tablero',
            translate: 'TABLERO.TABLERO_NAV',
            weight: 1
          });

          //Consolidado
          msNavigationService.saveItem('inspector.consolidado', {
            title: 'Consolidado',
            icon: 'icon-view-list',
            state: 'app.consolidado',
            translate: 'CONSOLIDADO.CONSOLIDADO_NAV',
            weight: 2
          });

          //Flota
          msNavigationService.saveItem('inspector.flota', {
            title: 'Flota',
            icon: 'icon-car',
            state: 'app.flota',
            translate: 'FLOTA.FLOTA_NAV',
            weight: 3
          });

          //
          msNavigationService.saveItem('inspector.seguimiento', {
            title: 'Seguimiento',
            icon: 'icon-trello',
            state: 'app.seguimiento',
            translate: 'TRACKING.TRACKING_NAV',
            weight: 4
          });

          //informes
          msNavigationService.saveItem('inspector.informes', {
            title: 'Informes',
            icon: 'icon-file-document',
            state: 'app.informes',
            translate: 'INFORMES.INFORMES_NAV',
            weight: 5
          });

          //administracion
          msNavigationService.saveItem('admin', {
            title: 'Administracion',
            group: true,
            weight: 6
          });

          msNavigationService.saveItem('admin.clientes', {
            title: 'Clientes',
            state: 'app.administracion.clientes',
            translate: 'ADMIN.CUSTOMER_NAV',
            weight: 1
          });

          msNavigationService.saveItem('admin.usuarios', {
            title: 'Usuarios',
            state: 'app.administracion.usuarios',
            translate: 'ADMIN.USER_NAV',
            weight: 2
          });

          msNavigationService.saveItem('admin.inspecciones', {
            title: 'Inspecciones',
            state: 'app.administracion.inspecciones',
            translate: 'ADMIN.INSPECTION_NAV',
            weight: 3
          });

          msNavigationService.saveItem('admin.vehiculos', {
            title: 'Vehiculos',
            state: 'app.administracion.vehiculos',
            translate: 'ADMIN.VEHICLE_NAV',
            weight: 4
          });

          msNavigationService.saveItem('admin.centro-alertas', {
            title: 'Centro Alertas',
            state: 'app.administracion.centro-alertas',
            translate: 'ADMIN.WARNING_CENTER_NAV',
            weight: 5
          });

        },
        'sede': function() {
          //Tablero Gerencial
          msNavigationService.saveItem('inspector', {
            title: 'INSPECTOR',
            group: true,
            weight: 1
          });

          msNavigationService.saveItem('inspector.tablero', {
            title: 'Tablero Gerencial',
            icon : 'icon-chart-line',
            state: 'app.tablero',
            translate: 'TABLERO.TABLERO_NAV',
            weight: 1
          });

          //Consolidado
          msNavigationService.saveItem('inspector.consolidado', {
            title: 'Consolidado',
            icon: 'icon-view-list',
            state: 'app.consolidado',
            translate: 'CONSOLIDADO.CONSOLIDADO_NAV',
            weight: 2
          });

          //Flota
          msNavigationService.saveItem('inspector.flota', {
            title: 'Flota',
            icon: 'icon-car',
            state: 'app.flota',
            translate: 'FLOTA.FLOTA_NAV',
            weight: 3
          });

          //informes
          msNavigationService.saveItem('inspector.informes', {
            title: 'Informes',
            icon: 'icon-file-document',
            state: 'app.informes',
            translate: 'INFORMES.INFORMES_NAV',
            weight: 4
          });

          //administracion
          msNavigationService.saveItem('admin', {
            title: 'Administracion',
            group: true,
            weight: 6
          });

          msNavigationService.saveItem('admin.clientes', {
            title: 'Clientes',
            state: 'app.administracion.clientes',
            translate: 'ADMIN.CUSTOMER_NAV',
            weight: 1
          });

          msNavigationService.saveItem('admin.usuarios', {
            title: 'Usuarios',
            state: 'app.administracion.usuarios',
            translate: 'ADMIN.USER_NAV',
            weight: 2
          });

          msNavigationService.saveItem('admin.inspecciones', {
            title: 'Inspecciones',
            state: 'app.administracion.inspecciones',
            translate: 'ADMIN.INSPECTION_NAV',
            weight: 3
          });

          msNavigationService.saveItem('admin.vehiculos', {
            title: 'Vehiculos',
            state: 'app.administracion.vehiculos',
            translate: 'ADMIN.VEHICLE_NAV',
            weight: 4
          });

          msNavigationService.saveItem('admin.centro-alertas', {
            title: 'Centro Alertas',
            state: 'app.administracion.centro-alertas',
            translate: 'ADMIN.WARNING_CENTER_NAV',
            weight: 5
          });
        },
        'flota': function() {
          //Tablero Gerencial
          msNavigationService.saveItem('inspector', {
            title: 'INSPECTOR',
            group: true,
            weight: 1
          });

           //Flota
          msNavigationService.saveItem('inspector.flota', {
            title: 'Flota',
            icon: 'icon-car',
            state: 'app.flota',
            translate: 'FLOTA.FLOTA_NAV',
            weight: 2
          });

          msNavigationService.saveItem('inspector.flota', {
            title: 'Flota',
            icon: 'icon-car',
            state: 'app.flota',
            translate: 'FLOTA.FLOTA_NAV',
            weight: 2
          });

          //Consolidado
          msNavigationService.saveItem('inspector.consolidado', {
            title: 'Consolidado',
            icon: 'icon-view-list',
            state: 'app.consolidado',
            translate: 'CONSOLIDADO.CONSOLIDADO_NAV',
            weight: 3
          });

          //
          msNavigationService.saveItem('inspector.seguimiento', {
            title: 'Seguimiento',
            icon: 'icon-trello',
            state: 'app.seguimiento',
            translate: 'TRACKING.TRACKING_NAV',
            weight: 4
          });

          //informes
          msNavigationService.saveItem('inspector.informes', {
            title: 'Informes',
            icon: 'icon-file-document',
            state: 'app.informes',
            translate: 'INFORMES.INFORMES_NAV',
            weight: 5
          });

          //administracion
          msNavigationService.saveItem('admin', {
            title: 'Administracion',
            group: true,
            weight: 5
          });

          msNavigationService.saveItem('admin.usuarios', {
            title: 'Usuarios',
            state: 'app.administracion.usuarios',
            translate: 'ADMIN.USER_NAV',
            weight: 6
          });

          msNavigationService.saveItem('admin.vehiculos', {
            title: 'Vehiculos',
            state: 'app.administracion.vehiculos',
            translate: 'ADMIN.VEHICLE_NAV',
            weight: 7
          });

          msNavigationService.saveItem('admin.vehiculos', {
            title: 'Vehiculos',
            state: 'app.administracion.vehiculos',
            translate: 'ADMIN.VEHICLE_NAV',
            weight: 8
          });

          msNavigationService.saveItem('admin.providers', {
            title: 'Providers',
            state: 'app.administracion.providers',
            translate: 'ADMIN.PROVIDER_NAV',
            weight: 9
          });
        },
        'tecnico': function() {
          //Tablero Gerencial
          msNavigationService.saveItem('inspector', {
            title: 'INSPECTOR',
            group: true,
            weight: 1
          });

          msNavigationService.saveItem('inspector.inspections', {
            title: 'Inspections',
            translate: 'REVIEW.REVIEW',
            icon: 'icon-checkbox-marked',
            state: 'app.reviews',
            weight: 2
          });

          //Consolidado
          msNavigationService.saveItem('inspector.consolidado', {
            title: 'Consolidado',
            icon: 'icon-view-list',
            state: 'app.consolidado',
            translate: 'CONSOLIDADO.CONSOLIDADO_NAV',
            weight: 3
          });

          //administracion
          msNavigationService.saveItem('admin', {
            title: 'Administracion',
            group: true,
            weight: 4
          });

          msNavigationService.saveItem('admin.vehiculos', {
            title: 'Vehiculos',
            state: 'app.administracion.vehiculos',
            weight: 5
          });
        },
        'country Manager': function() {
          //Tablero Gerencial
          msNavigationService.saveItem('inspector', {
            title: 'MOBI App',
            group: true,
            weight: 1
          });

          msNavigationService.saveItem('inspector.requests', {
            icon : 'icon-email',
            title: 'Requess',
            state: 'app.requests_providers',
            translate: 'ADMIN.REQUESTS_NAV',
            weight: 2
          });

          msNavigationService.saveItem('inspector.providers', {
            icon : 'icon-taxi',
            title: 'Providers',
            state: 'app.administracion.providers',
            translate: 'ADMIN.PROVIDER_NAV',
            weight: 3
          });

          msNavigationService.saveItem('inspector.orders', {
            icon : 'icon-cart-outline',
            title: 'Orders',
            state: 'app.orders',
            translate: 'ADMIN.ORDERS_NAV',
            weight: 4
          });

          //administracion
          msNavigationService.saveItem('admin', {
            title: 'Administracion',
            group: true,
            weight: 5
          });

          msNavigationService.saveItem('admin.promotions', {
            title: 'Promotions',
            state: 'app.administracion.promotions',
            translate: 'ADMIN.PROMOTIONS_NAV',
            weight: 6
          });

        },
        'provider_app': function() {
          //Tablero Gerencial
          msNavigationService.saveItem('inspector', {
            title: 'MOBI App',
            group: true,
            weight: 1
          });

          msNavigationService.saveItem('inspector.providers', {
            icon : 'icon-taxi',
            title: 'Providers',
            state: 'app.administracion.providers.edit',
            translate: 'ADMIN.CONFIG_PROVIDER_NAV',
            weight: 2
          });

          msNavigationService.saveItem('inspector.orders', {
            icon : 'icon-cart-outline',
            title: 'Orders',
            state: 'app.orders',
            translate: 'ADMIN.ORDERS_NAV',
            weight: 3
          });

          //administracion
          msNavigationService.saveItem('admin', {
            title: 'Administracion',
            group: true,
            weight: 4
          });

          msNavigationService.saveItem('admin.promotions', {
            title: 'Promotions',
            state: 'app.administracion.promotions',
            translate: 'ADMIN.PROMOTIONS_NAV',
            weight: 5
          });

        },
        'tecnico flota': function() {
          //Tablero Gerencial
          msNavigationService.saveItem('inspector', {
            title: 'INSPECTOR',
            group: true,
            weight: 1
          });

          msNavigationService.saveItem('inspector.inspections', {
            title: 'Inspections',
            translate: 'REVIEW.REVIEW',
            icon: 'icon-checkbox-marked',
            state: 'app.reviews',
            weight: 3
          });

          //Consolidado
          msNavigationService.saveItem('inspector.consolidado', {
            title: 'Consolidado',
            icon: 'icon-view-list',
            state: 'app.consolidado',
            translate: 'CONSOLIDADO.CONSOLIDADO_NAV',
            weight: 2
          });

          //administracion
          msNavigationService.saveItem('admin', {
            title: 'Administracion',
            group: true,
            weight: 6
          });

          msNavigationService.saveItem('admin.vehiculos', {
            title: 'Vehiculos',
            state: 'app.administracion.vehiculos',
            weight: 4
          });
        },
        'aseguradora': function() {
          return 'Pepsi';
        },
        'callCenter': function() {
          return 'Lemonade';
        }
      };
      if (role) {
        return menu[role]();
      }

    }


  }

})();
