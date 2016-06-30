angular
    .module('app')
    .controller('MegalitosComunidadController', ['$scope', 'MegalitosService', 'amMoment','$stateParams', function($scope,

        MegalitosService, amMoment, $stateParams) {
        $scope.megalitos = [];

        //console.log(cookies);
        //userId = cookies.userId.split(':')[1].split('.')[0];
        // $scope.token=cookies.access_token.split(':')[1].split('.')[0];
        //$scope.userId=userId;
        //console.log($scope.token);
        //megalito guztiak ez, aldatzeko
        console.log($stateParams.comunidad);
        MegalitosService.getLugaresComunidad($stateParams.comunidad)
            .then(function(lugares) {
                    lugares.forEach(function(lugar) {
                        MegalitosService.getMegalito(lugar.megalitosId)
                            .then(function(megalito) {
                                    $scope.megalitos.push(megalito);
                                },
                                function(reason) {
                                    //reason megalito
                                    console.log(reason);

                                });



                    });
                },
                function(reason) {
                    //reason lugares
                    console.log(reason);

                });


        $scope.images = [];
        $scope.getImages = function(megalito) {
            MegalitosService.getImagesMegalito(megalito.id)
                .then(function(images) {
                        megalito.images=images[0];
                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });


        };


    }]);
