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
    .filter('groupBy', [function() {
        var results={};
    return function (data, key) {
        if (!(data && key)) return;
        var result;
        if(!this.$id){
            result={};
        }else{
            var scopeId = this.$id;
            if(!results[scopeId]){
                results[scopeId]={};
                this.$on("$destroy", function() {
                    delete results[scopeId];
                });
            }
            result = results[scopeId];
        }

        for(var groupKey in result)
          result[groupKey].splice(0,result[groupKey].length);

        for (var i=0; i<data.length; i++) {
            if (!result[data[i][key]])
                result[data[i][key]]=[];
            result[data[i][key]].push(data[i]);
        }

        var keys = Object.keys(result);
        for(var k=0; k<keys.length; k++){
          if(result[keys[k]].length===0)
            delete result[keys[k]];
        }
        return result;
    };

    }]);
