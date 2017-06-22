(function ()
{
    'use strict';

    angular
        .module('app.pages.provider-requests')
        .controller('ProviderRequestsController', ProviderRequestsController);

    /** @ngInject */
    function ProviderRequestsController(MyRequests)
    {
        var vm = this;

        // Data
        vm.requests = MyRequests.data;

        // Methods


        //////////
    }

})();
