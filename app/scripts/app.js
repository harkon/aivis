'use strict';

/**
 * @ngdoc overview
 * @name aivisApp
 * @description
 * # aivisApp
 *
 * Main module of the application.
 */
angular
  .module('aivisApp', [
    'ngStorage',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
