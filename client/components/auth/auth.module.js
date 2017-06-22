'use strict';

angular.module('inspector.login', [
    'inspector.constants',
    'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
