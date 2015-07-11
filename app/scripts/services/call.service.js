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

		$localStorage.callService = {};

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
			if (str.indexOf("00") === 0) {
				return str.split(/[\+\(\)\-\s]/).join("").split(/(\d{3})/g).join(" ");
			} else {
				return("00" + str).split(/[\+\(\)\-\s]/).join("").split(/(\d{3})/g).join(" ");
			}

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
				console.log(model);
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