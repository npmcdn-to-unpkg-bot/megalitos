angular
    .module('app')
    .controller('MegalitosController', ['$scope', '$rootScope', 'MegalitosService', 'amMoment', '$state', function($scope, $rootScope, MegalitosService,
        amMoment, $state) {

        //var favoriteCookie = $cookies.get('myFavorite');

        //userId = cookies.userId.split(':')[1].split('.')[0];
        // $scope.token=cookies.access_token.split(':')[1].split('.')[0];
        //$scope.userId=userId;
        //console.log($scope.token);
        //megalito guztiak ez, aldatzeko
        MegalitosService.getAllMegalitos()
            .then(function(megalitos) {
                $scope.megalitos = megalitos;
                    megalitos.forEach(function(megalito) {
                        MegalitosService.getAllImagesMegalito(megalito.id)
                            .then(function(images) {
                                    megalito.images = images[0];
                                },
                                function(reason) {
                                    //reason megalitos
                                    console.log(reason);

                                });
                        MegalitosService.getUser(megalito.userId)
                            .then(function(user) {
                                    //$scope.megalitoUser = user;
                                    megalito.username=user;
                                },
                                function(reason) {
                                    //reason megalitos
                                    console.log(reason);

                                });
                        MegalitosService.countComentariosMegalitos(megalito.id)
                            .then(function(comentarios) {
                                megalito.countComentarios=comentarios;
                                
                               // $scope.countComentarios.push(comentarios);
                            }, function(reason) {
                                console.log(reason);
                            });

                    });

                },
                function(reason) {
                    //reason megalitos
                    console.log(reason);

                });

        
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
