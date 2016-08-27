angular
    .module('app')
    .controller('UserMegalitosController', ['$scope','$state', 'MegalitosService', 'amMoment', function($scope,$state, MegalitosService,
        amMoment) {

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
                    megalito.images=images[0];
                },
                function(reason) {
                    //reason megalitos
                    console.log(reason);

                });


        };
        $scope.editMegalito=function(megalito){
            console.log(megalito.id);
           $state.go('user-edit-megalito-upload', {megalitoId: megalito.id});
           

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