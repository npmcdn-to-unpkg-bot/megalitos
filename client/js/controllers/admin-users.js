angular
    .module('app')
    .controller('AdminUsersController', ['$scope', '$rootScope', '$state', 'MegalitosService', 'amMoment', '$stateParams', 'DTOptionsBuilder', 'DTColumnBuilder', function($scope, $rootScope, $state,
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
                    megalitos.forEach(function(megalito, index) {
                        MegalitosService.getUser(megalito.userId)
                            .then(function(user) {
                                    $scope.megalitos[index].username = user.username;
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
                    comentarios.forEach(function(comentario, index) {
                        MegalitosService.getMegalito(comentario.megalitosId)
                            .then(function(megalito) {
                                    $scope.coments(index).nombre=megalito.nombre;                       

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

    }]);
