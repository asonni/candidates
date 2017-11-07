(function() {
  'use strict';
  angular.module('candidates').service('helpers', [
    '$http',
    function($http) {
      var helpers = {
        compare2Objects: function(x, y) {
          if (x === y) return true;
          // if both x and y are null or undefined and exactly the same

          if (!(x instanceof Object) || !(y instanceof Object)) return false;
          // if they are not strictly equal, they both need to be Objects

          if (x.constructor !== y.constructor) return false;
          // they must have the exact same prototype chain, the closest we can do is
          // test there constructor.

          for (var p in x) {
            if (!x.hasOwnProperty(p)) continue;
            // other properties were tested using x.constructor === y.constructor

            if (!y.hasOwnProperty(p)) return false;
            // allows to compare x[ p ] and y[ p ] when set to undefined

            if (x[p] === y[p]) continue;
            // if they have the same strict value or identity then they are equal

            if (typeof x[p] !== 'object') return false;
            // Numbers, Strings, Functions, Booleans must be strictly equal

            if (!Object.equals(x[p], y[p])) return false;
            // Objects and Arrays must be tested recursively
          }

          for (p in y) {
            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
            // allows x[ p ] to be set to undefined
          }
          return true;
        },
        compareJSON: function(json1, json2) {
          var objectsDiffering = [];
          helpers.compareJSONRecursive(json1, json2, objectsDiffering);
          return objectsDiffering;
        },
        compareJSONRecursive: function(json1, json2, objectsDiffering) {
          console.log(json1);
          for (prop in json1) {
            if (json2.hasOwnProperty(prop)) {
              switch (typeof json1[prop]) {
                case 'object':
                  helpers.compareJSONRecursive(
                    json1[prop],
                    json2[prop],
                    objectsDiffering
                  );
                  break;
                default:
                  if (json1[prop] !== json2[prop]) {
                    objectsDiffering.push(json1);
                  }
                  break;
              }
            } else {
              objectsDiffering.push(json1);
              break;
            }
          }
        },
        leftToRight: function(text) {
          var plainText = '';
          var array = text.split(' ');
          var arabic = /[\u0600-\u06FF]/;
          var english = /^[A-Za-z]*$/;
          var string = 'english';
          for (var i = 0; i < array.length; i++) {
            if (english.test(array[i])) {
              plainText = '\u0020.' + array[i] + '\u0020' + plainText;
            } else {
              plainText = array[i] + '\u0020' + plainText;
            }
          }
          return plainText;
        },
        reduceDate: function(date) {
          var fullDate = new Date(date);
          return (
            fullDate.getFullYear() +
            '-' +
            ('0' + (fullDate.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + fullDate.getDate()).slice(-2)
          );
        }
      };
      return helpers;
    }
  ]);
})();
