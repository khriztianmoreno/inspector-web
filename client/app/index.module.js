(function ()
{
    'use strict';

    /**
     * Main module of the Inspector
     */
    angular
        .module('inspector', [

            // Core
            'app.core',

            // Navigation
            'app.navigation',

            // Toolbar
            'app.toolbar',

            // Quick panel
            'app.quick-panel',

            //Authenticate
            'inspector.login',

            //Login
            'app.user.login',

            //Forgot Password
            'app.user.forgot-password',

            //Reset Password
            'app.user.reset-password',

            //Pages
            'app.pages.consolidado',

            // Request Providers
            'app.pages.provider-requests',

            // Mi Flota
            'app.pages.flota',

            //Orders provider
            'app.orders',

            'app.pages.tablero',

            'app.pages.informes',

            'app.pages.tracking',

            //Errors
            'app.pages.error-500',
            'app.pages.error-404',
            'app.pages.error-403',

            'app.inspections',

            //administracion
            'app.administracion',

            //Profil
            'app.pages.profile'


        ]);
})();
