angular
    .module('app')
    .controller('MegalitosComunidadController', ['$scope', '$http', 'User', '$cookies', 'Megalitos', 'amMoment', 'Imagenes', 'Lugares', '$stateParams', function($scope,
        
        $http, User, cookies, Megalitos, amMoment, Imagenes, Lugares, $stateParams) {
        console.log($stateParams);
        $scope.megalitos=[];

        //console.log(cookies);
        //userId = cookies.userId.split(':')[1].split('.')[0];
        // $scope.token=cookies.access_token.split(':')[1].split('.')[0];
        //$scope.userId=userId;
        //console.log($scope.token);
        //megalito guztiak ez, aldatzeko
        Lugares
            .find({
                filter: {
                    where: {
                        comunidad: $stateParams.comunidad
                    }
                }
            })
            .$promise
            .then(function(lugares) {
                //$scope.lugares = lugares;
                //recorrer todos los megalitos de un lugar
                lugares.forEach(function(lugar) {

                    Megalitos.findById({ id: lugar.megalitosId })
                        .$promise
                        .then(function(megalito) {
                            $scope.megalitos.push(megalito);
                        });

                });


            });

        $scope.images = [];
        $scope.getImages = function(id) {
            Imagenes.find({
                    filter: {
                        where: {
                            megalitosId: id
                        }
                    }
                }).$promise
                .then(function(images) {
                        $scope.images.push(images[0]);
                    },
                    function(reason) {
                        console.log(reason);
                    });


        };

    }]);
