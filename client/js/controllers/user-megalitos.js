angular
    .module('app')
    .controller('UserMegalitosController', ['$scope', '$state', 'MegalitosService', 'amMoment','$mdDialog', function($scope, $state, MegalitosService,
        amMoment,$mdDialog) {

        //var favoriteCookie = $cookies.get('myFavorite');

        //userId = cookies.userId.split(':')[1].split('.')[0];
        // $scope.token=cookies.access_token.split(':')[1].split('.')[0];
        //$scope.userId=userId;
        //console.log($scope.token);
        //megalito guztiak ez, aldatzeko
        var userLocal = window.localStorage.getItem("$LoopBack$currentUserId");
        MegalitosService.getAllUserMegalitos(userLocal)
            .then(function(megalitos) {
                    $scope.megalitos = megalitos;
                },
                function(reason) {
                    //reason megalitos
                    console.log(reason);

                });

        $scope.images = [];
        $scope.getImages = function(megalito) {
            MegalitosService.getAllImagesMegalito(megalito.id)
                .then(function(images) {
                        megalito.images = images[0];
                    },
                    function(reason) {
                        //reason megalitos
                        console.log(reason);

                    });


        };
        $scope.editMegalito = function(megalito) {
            $state.go('user-edit-megalito-upload', { megalitoId: megalito.id });


        };
        $scope.showConfirm = function(megalitoId, ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Estas seguro de borrar este megalito?')
                .textContent('Todos los comentarios relacionados con este megalito se borraran')
                .ariaLabel('Buen dia')
                .targetEvent(ev)
                .ok('Aceptar')
                .cancel('Cancelar');
            $mdDialog.show(confirm).then(function() {
                deleteMegalito(megalitoId);
            }, function() {
            });
        };

        function deleteMegalito(megalitoId) {

            console.log(megalitoId);

            MegalitosService.deleteMegalito(megalitoId)
                .then(function(megalito) {},
                    function(reason) {
                        //reson megalitos
                        console.log(reason);
                    });
            //eliminar lugares
            MegalitosService.getLugaresMegalito(megalitoId)
                .then(function(lugar) {
                        MegalitosService.deleteLugares(lugar[0].id)
                            .then(function(lugares) {

                                },
                                function(reason) {
                                    //reason lugares
                                    console.log(reason);
                                    //borrar megalito y lugares
                                });


                    },
                    function(reason) {
                        //reason megalitos
                        console.log(reason);

                    });

            MegalitosService.getCoordenadasMegalito(megalitoId)
                .then(function(coordenadas) {
                        MegalitosService.deleteCoordenadas(coordenadas[0].id)
                            .then(function(coordenadas) {

                                },
                                function(reason) {
                                    console.log(reason);
                                    //borrar megalito lugares y coordenadas
                                });


                    },
                    function(reason) {
                        //reason megalitos
                        console.log(reason);

                    });


            MegalitosService.getAllImagesMegalito(megalitoId)
                .then(function(imagenes) {
                        MegalitosService.deleteImagenes(imagenes[0].id)
                            .then(function(imagenes) {

                                },
                                function(reason) {
                                    //reason imagenes
                                    console.log(reason);
                                });


                    },
                    function(reason) {
                        //reason megalitos
                        console.log(reason);

                    });

        };
        $scope.readMore = function(megalito) {
            $state.go('megalito', { megalitoId: megalito.id });

        };


        //$scope.user = User.findById({ id: userId });



        /* $scope.reviews = Review.find({
           filter: {
             include: [
               'coffeeShop',
               'reviewer'
             ]
           }
         });
         */

    }]);
