(function() {
  'use strict';
  angular
    .module('inspector')
    .constant('ApiEndpoint', {
      //Sort by first letter
      customers: {
        uri           : '/api/customers',
        my            : '/my',
        filter        : '/filter',
        distributors  : '/distributors',
        providers     : '/providers',
        myServices: '/myServices',
      },
      users: {
        uri: '/api/users',
        my: '/my',
        tokenReset: '/reset',
        findUsers: '/users/',
        byProviders: '/provider/',
      },
      warningCenter:{
        uri: '/api/warnings',
      },
      inspections: {
        uri: '/api/inspections'
      },
      profile: {
        uri: '/api/users/me'
      },
      systemvalues: {
        uri: '/api/systemvalues',
        infoVehicles: '/fasecolda',
        roles: '/roles',
        cities: '/cities'
      },
      requestProviders:{
        uri: '/api/provider-requests'
      },
      orders: {
        uri: '/api/orders'
      },
      promotions: {
        uri: '/api/promotions'
      },
      vehicles: {
        uri: '/api/vehicles',
        search: '/search',
        page: '/1',
        limit: '/10',
        plate: '/plate/',
        widgets: '/widgets'
      },
      trackings: {
        uri: '/api/trackings'
      },
      providers:{
        uri: '/api/trackings'
      },
      reviews: {
        uri       : '/api/reviews',
        dashboard : '/dashboard',
        totalBydays: '/totalbydays',
        report: '/report'
      },
      image: {
        upload: '/api/images/upload',
      },
    });
})();
