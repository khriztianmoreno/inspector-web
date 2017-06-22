(function() {
    'use strict';

    angular
      .module('app.user.login')
      .controller('LoginController', LoginController);

    LoginController.$inject = ['Auth', '$state', 'Menu'];

    /** @ngInject */
    function LoginController(Auth, $state, Menu) {
      var vm = this;

      // Data
      vm.user = {};
      vm.errors = {};
      vm.submitted = false;

      // Methods
      vm.login = login;

      //////////

      /**
       * Change Contacts List Filter
       * @param form
       */
      function login(form) {
        vm.submitted = true;

        if (form.$valid) {
          Auth.login({
              email: vm.user.email,
              password: vm.user.password
            })
            .then(function(resp) {
              switch (resp.role) {
                case 'provider_app':
                  // resp.customer.localId
                  $state.go('app.administracion.providers.edit', { id: resp.customer.localId });
                  break;
                case 'country Manager':
                  // Logged in, redirect to country Manager
                  $state.go('app.requests_providers');
                  break;
                case 'tecnico':
                  // Logged in, redirect to home Technical
                  $state.go('app.reviews');
                  break;
                case 'flota':
                  // Logged in, redirect to home Technical
                  $state.go('app.flota');
                  break;
                default:
                  // Logged in, redirect to home
                  $state.go('app.tablero');
                  break;
              }
            })
            .catch(function(err) {
              vm.showError = true;
              vm.errors.other = err.message;
            });
        }
      }

    }
})();
