(function ()
{
    'use strict';

    angular
        .module('inspector')
        .run(runBlock);

    function isRoleAuthorized(role, state) {
      var permissions = {
        'admin': [/.*/],
        'cda': [
          /app\.administracion\.vehiculos/,
          /app\.administracion\.clientes/,
          /app\.administracion\.inspecciones/,
          /app\.administracion\.usuarios/,
          /app\.administracion\.centro-alertas/,
          /app\.consolidado/,
          /app\.tablero/,
          /app\.flota/,
          /app\.seguimiento/,
          /app\.informes/,
        ],
        'flota': [
          /app\.administracion\.vehiculos/,
          /app\.administracion\.usuarios/,
          /app\.administracion\.clientes/,
          /app\.consolidado/,
          /app\.flota/,
          /app\.seguimiento/,
          /app\.informes/,
          /app\.administracion\.centro-alertas/,
          /app\.administracion\.providers/,
        ],
        'sede': [
          /app\.administracion\.inspecciones/,
          /app\.administracion\.vehiculos/,
          /app\.administracion\.usuarios/,
          /app\.administracion\.clientes/,
          /app\.consolidado/,
          /app\.flota/,
          /app\.tablero/,
          /app\.informes/,
          /app\.administracion\.centro-alertas/,
        ],
        'tecnico': [
          /app\.administracion\.vehiculos/,
          /app\.reviews/,
          /app\.consolidado/
        ],
        'tecnico flota': [
          /app\.administracion\.vehiculos/,
          /app\.reviews/,
          /app\.consolidado/,
        ],
        'country Manager': [
          /app\.requests_providers/,
          /app\.administracion\.providers/,
          /app\.orders/,
          /app\.administracion\.promotions/,
        ],
        'provider_app': [
          /app\.administracion\.providers.edit/,
          /app\.orders/,
          /app\.administracion\.promotions/,
        ],
      }

      var currentPermissions = permissions[role];
      var permissionsForAll = [/app\.pages_profile/, /app\.pages_errors/];

      if (currentPermissions) {
        return currentPermissions.concat(permissionsForAll).some(function (exp) {
          return exp.test(state);
        });
      }

      return false;
    }

    /** @ngInject */
    function runBlock($rootScope, $timeout, $state, Auth, Menu) {

        $rootScope.currentRole = "";
        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function () {
            $rootScope.loadingProgress = true;
        });

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
          var isLoggedIn =  Auth.isLoggedIn();

          if (toState.authenticate && !Auth.isLoggedIn()){
            // User isn’t authenticated
            $state.go("app.user_login");
            //event.preventDefault();
          }
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            $timeout(function () {

                var role = Auth.getCurrentUser().role;

                $rootScope.loadingProgress = false;

                if (!$rootScope.currentRole) {
                    $rootScope.currentRole = Auth.getCurrentUser().role;
                }

                if (Auth.isLoggedIn()) {
                    Menu.draw(role);

                    // Validate permissions
                    var role = Auth.getCurrentUser().role;
                    var isAllowed = isRoleAuthorized(role, toState.name);
                    if (!isAllowed) {
                      $state.go('app.pages_errors_error-403');
                    }

                } else if (role !== $rootScope.currentRole && role !== undefined) {
                    $state.go("app.pages_errors_error-403");
                } else {
                    $rootScope.currentRole = "";
                }
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function () {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });
    }
})();
