(function ()
{
    'use strict';

    angular
        .module('app.core')
        .config(config);

    /** @ngInject */
    function config($ariaProvider, $logProvider, msScrollConfigProvider, uiGmapGoogleMapApiProvider, $translateProvider, fuseConfigProvider)
    {
        // Enable debug logging
        $logProvider.debugEnabled(true);

         // uiGmapgoogle-maps configuration
        uiGmapGoogleMapApiProvider.configure({
            key         : 'AIzaSyDDDTdU9_f71SeLzDkljddBkihb_oGvqYo',
            v           : '3.exp',
            libraries   : 'weather,geometry,visualization'
        });

        // angular-translate configuration
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '{part}/i18n/{lang}.json'
        });
        $translateProvider.preferredLanguage('es');
        $translateProvider.useSanitizeValueStrategy('sanitize');

        /*eslint-disable */

        // ng-aria configuration
        $ariaProvider.config({
            tabindex: false
        });

        // Fuse theme configurations
        fuseConfigProvider.config({
            'disableCustomScrollbars'        : false,
            'disableCustomScrollbarsOnMobile': true,
            'disableMdInkRippleOnMobile'     : true
        });

        // msScroll configuration
        msScrollConfigProvider.config({
            wheelPropagation: true
        });

        /*eslint-enable */
    }
})();
