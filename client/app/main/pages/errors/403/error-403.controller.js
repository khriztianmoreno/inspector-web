(function() {
  'use strict';

  angular
    .module('app.pages.error-403')
    .controller('Error403Controller', Error403Controller);

  /** @ngInject */
  function Error403Controller(Auth, $state, $timeout) {
    var vm = this;

    // Data
    vm.goToDashboard = 'app.tablero';
    // Methods
    if (Auth.isLoggedIn()) {
      var userRole = Auth.getCurrentUser().role;
      switch (userRole) {
        case 'provider_app':
                  // resp.customer.localId
          $state.go('app.administracion.providers.edit', { id: Auth.getCurrentUser().customer.localId });
          break;
        case 'country Manager':
          // Logged in, redirect to country Manager
          $state.go('app.requests_providers');
          break;
        case 'tecnico flota':
          // Logged in, redirect to home Technical
          vm.goToDashboard = 'app.reviews';
          break;
        case 'tecnico':
          // Logged in, redirect to home Technical
          vm.goToDashboard = 'app.reviews';
          break;
        case 'flota':
          // Logged in, redirect to home Technical
          vm.goToDashboard =  'app.flota';
          break;
        default:
          // Logged in, redirect to home
          vm.goToDashboard =  'app.tablero';
          break;
      }
    }

    //////////
  }
})();
