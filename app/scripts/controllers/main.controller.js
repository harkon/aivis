'use strict';

/**
 * @ngdoc function
 * @name aivisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * This is the main controller of the aivisApp.
 */
angular.module('aivisApp')
  .controller('MainCtrl', function($scope, $timeout, CallService) {

    var main = this;

    main.call = {};
    main.calls = null;
    main.predicate = 'time';
    main.reverse = false;
    main.nextCall = {};
    main.timeReg = /^([0-5]?\d:[0-5]?\d)$/;

    var getNext = function() {
      main.nextCall = CallService.getNext();
    };

    main.submit = function() {
      main.calls = CallService.save(main.call);
      getNext();
      main.call = {};
    };

    main.remove = function(c) {
      main.calls = CallService.remove(c);
      getNext();
    };

    main.reset = function() {
      main.call = {};
    };

    main.order = function(predicate) {
      main.reverse = (main.predicate === predicate) ? !main.reverse : false;
      main.predicate = predicate;
    };

    main.all = function() {
      main.calls = CallService.getAll();
    };

    main.state = function(str) {
      main.calls = CallService.getByState(str);
    };

  });