angular
    .module('app')
    .controller('MegalitoController', ['$scope', '$rootScope', 'MegalitosService', 'amMoment', '$stateParams', function($scope, $rootScope,
        MegalitosService, amMoment, $stateParams) {
        $scope.imagesMegalito = [];
        $scope.properties = [];
        $scope.imagesShow = [];
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
        MegalitosService.getAllImagesMegalito($stateParams.megalitoId)
            .then(function(images) {
                    $scope.imagesMegalito.push(images[0]);
                    $scope.openLightboxModal();
                },
                function(reason) {
                    //reason images
                    console.log(reason);

                });

        MegalitosService.getAllUserResponses($scope.currentUser.id)
            .then(function(responses) {
                    responses.forEach(function(message) {
                        MegalitosService.getComment(message.comentariosId)
                            .then(function(comment) {
                                    if (comment.megalitosId === $stateParams.megalitoId) {
                                        MegalitosService.updateUserResponse(message.id)
                                            .then(function() {
                                                    $scope.$emit("myEvent", {});
                                                },
                                                function(reason) {
                                                    //reason images
                                                    console.log(reason);

                                                });

                                    }

                                },
                                function(reason) {
                                    //reason images
                                    console.log(reason);

                                });


                    });
                },
                function(reason) {
                    //reason images
                    console.log(reason);

                });

        $scope.openLightboxModal = function() {
            $scope.imagesShow = [];
            $scope.imagesMegalito[0].imagenes.forEach(function(imagen) {
                $scope.imagesShow.push({ thumb: "api/containers/img/download/" + imagen.name, img: "api/containers/img/download/" + imagen.name, downloadSrc: "api/containers/img/download/" + imagen.name });
            });
        };



    }]);
