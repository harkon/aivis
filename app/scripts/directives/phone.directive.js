'use strict';

/**
 * @ngdoc function
 * @name aivisApp.directive:phone
 * @description
 * # Phone
 * This directive is used for custom validation on the phone imput field
 */
angular.module('aivisApp')
  .directive('phone', function() {

    var INT_PHONE_REGEX = /(\+|(00))/;
    var ALLOWED_CHARS_REGEX = /[\d\s\(\)\-]*/g;
    var SPECIAL_CHARS_REGEX = /[\(\)\-]/g;
    var DIGITS_OR_SPACE_REGEX = /^[\d\s]*$/;

    var isUnique = function (arr) {
      if(!arr) return;
      var map = {};
      for (var i = 0; i < arr.length; i++) {
        if (map[arr[i]]) {
          return false;
        }
        map[arr[i]] = true;
      }
      return true;
    }

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {

        ctrl.$validators.phone = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          };

          var p1 = viewValue.substring(0, 2);
          var p2 = viewValue.substring(1, 9);
          var p3 = viewValue.substring(9);

          return INT_PHONE_REGEX.test(p1) &&
            ALLOWED_CHARS_REGEX.test(p2) &&
            isUnique(p2.match(SPECIAL_CHARS_REGEX)) && 
            DIGITS_OR_SPACE_REGEX.test(p3);
        }
      }
    }

  });
