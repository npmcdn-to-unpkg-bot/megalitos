angular
    .module('app')
    .controller('EtiquetasController', ['$scope', 'Lugares','$filter', function($scope,
        Lugares,$filter) {
        $scope.countMegalitos=[];
        Lugares
            .find()
            .$promise
            .then(function(lugares) {
                 $scope.lugares = $filter('countBy')(lugares,'comunidad');
            });

    }]);
