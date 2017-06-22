(function ()
{
    'use strict';

    angular
        .module('app.core')
        .filter('bool', bool);

    /** @ngInject */
    function bool()
    {
        return function (value)
        {
            if(value){
                return "Sí";
            } else{
                return "No";
            }

        };
    }

})();