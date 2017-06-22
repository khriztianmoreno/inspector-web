(function ()
{
    'use strict';

    angular
        .module('app.user.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.user_login', {
            url      : '/login',
            views    : {
                'main@'                          : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.user_login': {
                    templateUrl: 'app/main/auth/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login',
            controller: function($state, Auth) {
              var referrer = $state.params.referrer || $state.current.referrer || 'app.tablero';
              Auth.logout();
              $state.go(referrer);
            }
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/auth/login');

    }

})();
