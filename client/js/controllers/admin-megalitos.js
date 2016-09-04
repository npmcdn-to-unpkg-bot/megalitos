angular
    .module('app')
    .controller('AdminMegalitosController', ['$scope', '$rootScope', '$state', 'MegalitosService', 'amMoment', '$stateParams', 'DTOptionsBuilder', 'DTColumnBuilder', function($scope, $rootScope, $state,
        MegalitosService, amMoment, $stateParams, DTOptionsBuilder, DTColumnBuilder) {
        var dtOptions, dtColumns;
        dtOptions = DTOptionsBuilder.fromSource('data.json')
            .withDOM('frtip')
            .withPaginationType('full_numbers')
            // Active Buttons extension
            .withButtons([
                'columnsToggle',
                'colvis',
                'copy',
                'print',
                'excel', {
                    text: 'Some button',
                    key: '1',
                    action: function(e, dt, node, config) {
                        alert('Button activated');
                    }
                }
            ]);

        MegalitosService.getAllMegalitos()
            .then(function(megalitos) {
                    $scope.megalitos = megalitos;
                    megalitos.forEach(function(megalito) {
                        MegalitosService.getUser(megalito.userId)
                            .then(function(user) {
                                    megalito.username = user.username;
                                },
                                function(reason) {
                                    //reason megalitos
                                    console.log(reason);

                                });

                    });

                },
                function(reason) {
                    //reason megalitos
                    console.log(reason);

                });


        MegalitosService.getAllComentarios()
            .then(function(comentarios) {
                    $scope.comments = comentarios;
                    comentarios.forEach(function(comentario) {
                        MegalitosService.getMegalito(comentario.megalitosId)
                            .then(function(megalito) {
                                    comentario.nombre = megalito.nombre;

                                },
                                function(reason) {
                                    //reason megalitos
                                    console.log(reason);

                                });

                    });

                },
                function(reason) {
                    //reason images
                    console.log(reason);

                });
        $scope.editMegalito = function(megalitoId) {
            $state.go('user-edit-megalito-upload', { megalitoId: megalitoId });

        };
        $scope.deleteMegalito = function(megalitoId) {
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


    }]);
