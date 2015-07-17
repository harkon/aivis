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

    var INT_PHONE_REGEX = /(\+.|(00))/;
    /* 
      NOTE: There's a bug in this regex. Doesn't work as it's supposed to on the runtime,
      even though that works OK both on http://regexr.com/ and https://regex101.com/#javascript
    */

    var SPECIAL_CHARS_REGEX = /([\d\s]*\(?[\d\s]*\)?\-?[\d\s]*)/;
    var DIGITS_OR_SPACE_REGEX = /^[\d\s]*$/;

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
            SPECIAL_CHARS_REGEX.test(p2) &&
            DIGITS_OR_SPACE_REGEX.test(p3);
        }
      }
    }

  });