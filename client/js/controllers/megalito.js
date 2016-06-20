angular
    .module('app')
    .controller('MegalitoController', ['$scope',  'MegalitosService', 'amMoment','$stateParams', 'Lightbox', function($scope,
        MegalitosService, amMoment,$stateParams, Lightbox) {
        $scope.images = [];
        $scope.properties = [];
        MegalitosService.getMegalito($stateParams.megalitoId)
        .then(function(megalito) {
                $scope.megalito = megalito;
            },
            function(reason) {
                //reason megalito
                console.log(reason);

            });
        MegalitosService.getLugaresMegalito($stateParams.megalitoId)
        .then(function(lugar) {
                $scope.lugar = lugar[0];
            },
            function(reason) {
                //reason lugares
                console.log(reason);

            });
        MegalitosService.getCoordenadasMegalito($stateParams.megalitoId)
        .then(function(coordenadas) {
                $scope.coordenadas = coordenadas[0];
            },
            function(reason) {
                //reason coordenadas
                console.log(reason);

            });
        MegalitosService.getImagesMegalito($stateParams.megalitoId)
        .then(function(images) {
                $scope.images.push(images[0]);
            },
            function(reason) {
                //reason images
                console.log(reason);

            });


        $scope.openLightboxModal = function() {
            $scope.imagesUrl = [];
            $scope.images[0].imagenes.forEach(function(imagen) {
                $scope.imagesUrl.push("api/containers/img/download/" + imagen.name);
            });

            Lightbox.openModal($scope.imagesUrl, 0);
        };


    }]);
