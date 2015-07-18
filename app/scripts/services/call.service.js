'use strict';

/**
 * @ngdoc function
 * @name aivisApp.factory:CalService
 * @description
 * # CalService
 * Service of the aivisApp
 */


angular.module('aivisApp')
	.factory('CallService', function($localStorage) {

		$localStorage.callService = {"1436688600711":{"name":"John Doe","phone":"00420 111 222 333","time":1436688600711,"disabled":true},"1436689200659":{"name":"Foo Bar","phone":"00420 111 222 333","time":1436689200659,"disabled":true},"1436689800335":{"name":"Baz Qux","phone":"00420 111 222 333","time":1436689800335,"disabled":true},"1436690400848":{"name":"Daffy Doc","phone":"00420 111 222 333","time":1436690400848,"disabled":false}};

		var toTime = function(str) {
			var t = str.split(":");
			var date = new Date();
			date.setMinutes(parseInt(t[0]));
			date.setSeconds(parseInt(t[1]));

			return date.getTime();
		};

		var toArray = function(obj) {
			return Object.keys(obj).map(function(key) {
				setState(obj[key]);
				return obj[key];
			});
		};

		var format = function(str) {
			// 00XXX XXX XXX
			return "00" + str.replace(/(\+|(00))/, "").replace(/[\(\)\-\s]/g, "").match(/(\d{3})/g).join(" ");
		};

		var setState = function(obj) {
			var now = Date.now();
			if (obj.time < now) {
				obj.disabled = true;
			} else if (obj.time > now) {
				obj.disabled = false;
			}
			return obj;
		};

		var order = function(obj) {

			var sortedObject = {};
			var keys = Object.keys(obj);
			
			keys.sort();

			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var value = obj[key];
				sortedObject[key] = value;
			}

			return sortedObject;
		};

		var service = {
			save: function(model) {
				model.time = toTime(model.time);
				model.phone = format(model.phone);
				$localStorage.callService[model.time] = model;
				return toArray($localStorage.callService);
			},
			remove: function(model) {
				delete $localStorage.callService[model.time];
				return toArray($localStorage.callService);
			},
			getNext: function() {

				var now = Date.now(),
					sortedCalls = order($localStorage.callService),
					nextCall = null;

				$.each(sortedCalls, function(i, call) {
					if (call.time > now) {
						nextCall = call;
						return false;
					}
				});

				return nextCall;
			},
			getAll: function() {
				return toArray($localStorage.callService);
			},
			getByState: function(state) {

				if (!state) return;

				var now = Date.now();
				var res = [];

				function isFuture(obj) {
					return obj.time > now;
				};

				function isPast(obj) {
					return obj.time < now;
				};

				if (state === 'future') {
					res = toArray($localStorage.callService).filter(isFuture);
				} else if (state === 'past') {
					res = toArray($localStorage.callService).filter(isPast);
				}

				return res;
			}
		};

		return service;

	});