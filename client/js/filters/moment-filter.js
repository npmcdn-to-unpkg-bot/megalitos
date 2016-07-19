angular.module('app')
    .filter('capitalize', [function() {
        return function(input, scope) {
            if (input !== null)
                input = input.toLowerCase();
            return input.substring(0, 1).toUpperCase() + input.substring(1);
        };
    }])
    .filter('unique', [function() {
        return function(collection, keyname) {
            var output = [],
                keys = [];

            angular.forEach(collection, function(item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });

            return output;
        };

    }])
    .filter("buelta", [function() {
        return function(input) {
            var result = "";
            input = input || "";
            for (var i = 0; i < input.length; i++) {
                result = input.charAt(i) + result;
            }
            return result;
        };
    }]);
