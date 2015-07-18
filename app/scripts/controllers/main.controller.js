'use strict';

/**
 * @ngdoc function
 * @name aivisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * This is the main controller of the aivisApp.
 */
angular.module('aivisApp')
  .controller('MainCtrl', function($scope, $interval, CallService) {

    var data = [{
        "name": "John Doe",
        "phone": "+(420) 111 222 333",
        "time": "10:00",
        "disabled": true
      },{
        "name": "Foo Bar",
        "phone": "+(420)­111222333",
        "time": "20:00",
        "disabled": true
      },{
        "name": "Baz Qux",
        "phone": "+420111222333",
        "time": "30:00",
        "disabled": true
      },{
        "name": "Daffy Doc",
        "phone": "00420111222333",
        "time": "40:00",
        "disabled": false
      }];

    var main = this;

    main.call = {};
    main.calls = null;
    main.predicate = 'time';
    main.reverse = false;
    main.nextCall = {};
    main.timeReg = /^([0-5]?\d:[0-5]?\d)$/;

    var getAll = function() {
      main.calls = CallService.getAll();
    };

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
      getAll();
    };

    main.state = function(str) {
      main.calls = CallService.getByState(str);
    };

    //populate with data
    angular.forEach(data, function(call){
      CallService.save(call);
    });

    $interval(function(){
      console.log("time");
      getAll();
      getNext();
    }, 60000);

    getAll();
    getNext();
  
  });