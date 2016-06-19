angular
    .module('app')
    .controller('MegalitosController', ['$scope', '$rootScope', '$http', 'User', '$cookies', 'Megalitos', 'amMoment', 'Imagenes', function($scope, $rootScope,
        $http, User, cookies, Megalitos, amMoment, Imagenes) {

        //var favoriteCookie = $cookies.get('myFavorite');
        console.log(cookies);
        //userId = cookies.userId.split(':')[1].split('.')[0];
        // $scope.token=cookies.access_token.split(':')[1].split('.')[0];
        //$scope.userId=userId;
        //console.log($scope.token);
        //megalito guztiak ez, aldatzeko
        console.log($rootScope.currentUser);
        Megalitos
            .find()
            .$promise
            .then(function(megalitos) {
                $scope.megalitos = megalitos;
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
