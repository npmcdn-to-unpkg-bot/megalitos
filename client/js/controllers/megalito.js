angular
    .module('app')
    .controller('MegalitoController', ['$scope', 'User', '$cookies', 'Megalitos', 'amMoment', 'Imagenes', 'Coordenadas', 'Lugares', '$stateParams', 'Lightbox', function($scope,
        User, cookies, Megalitos, amMoment, Imagenes, Coordenadas, Lugares, $stateParams, Lightbox) {
        $scope.images = [];
        $scope.properties = [];
        $scope.megalito = Megalitos.findById({ id: $stateParams.megalitoId });
        Imagenes.find({
                filter: {
                    where: {
                        megalitosId: $stateParams.megalitoId
                    }
                }
            }).$promise
            .then(function(images) {
                    $scope.images.push(images[0]);
                },
                function(reason) {
                    console.log(reason);
                });
        Coordenadas.find({
                filter: {
                    where: {
                        megalitosId: $stateParams.megalitoId
                    }
                }
            }).$promise
            .then(function(coordenadas) {
                    $scope.coordenadas = coordenadas[0];
                },
                function(reason) {
                    console.log(reason);
                });
        Lugares.find({
                filter: {
                    where: {
                        megalitosId: $stateParams.megalitoId
                    }
                }
            }).$promise
            .then(function(lugar) {
                    $scope.lugar = lugar[0];
                },
                function(reason) {
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
