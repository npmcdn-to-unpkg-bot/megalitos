angular
    .module('app')
    .controller('EtiquetasController', ['$scope', 'MegalitosService','$filter', function($scope,
        MegalitosService,$filter) {
            MegalitosService.getAllLugares()
            .then(function(lugares) {
                $scope.lugares = $filter('countBy')(lugares, 'comunidad');
            }, function(reason) {
                console.log(reason);
            });

    }]);
