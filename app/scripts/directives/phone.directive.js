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

    var INT_PHONE_REGEX = /^(\+|(00))/;

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.phone = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          };

          if (viewValue.length < 3) {
            // for the first two characters use this regex
            return INT_PHONE_REGEX.test(viewValue);
          } else if (viewValue.length < 9) {
            // for the characters from 2 to 8 
            var l = (viewValue.match(/\(/g) || []).length;
            var r = (viewValue.match(/\)/g) || []).length;
            var m = (viewValue.match(/\-/g) || []).length;

            if (l > 1 || r > 1 || m > 1) {
              // if you find any symbol more than once throw an error
              return false;
            } else {
              // is valid
              return true;
            }
          } else {
            // for the rest of the characters in the field
            var rest = viewValue.substring(9);
            var l = (rest.match(/\(/g) || []).length;
            var r = (rest.match(/\)/g) || []).length;
            var m = (rest.match(/\-/g) || []).length;

            if (l === 1 || r === 1 || m === 1) {
              // if you find any thow error
              return false;
            } else {
              // else is valid
              return true;
            }
          };
          // it is invalid
          return false;
        };
      }
    };
  });