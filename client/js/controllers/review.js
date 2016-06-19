angular
    .module('app')
    .controller('AddReviewController', ['$scope', 'CoffeeShop', 'Review',
        '$state',
        function($scope, CoffeeShop, Review, $state) {
            $scope.action = 'Add';
            $scope.coffeeShops = [];
            $scope.selectedShop;
            $scope.review = {};
            $scope.isDisabled = false;

            CoffeeShop
                .find()
                .$promise
                .then(function(coffeeShops) {
                    $scope.coffeeShops = coffeeShops;
                    $scope.selectedShop = $scope.selectedShop || coffeeShops[0];
                });

            $scope.submitForm = function() {
                Review
                    .create({
                        rating: $scope.review.rating,
                        comments: $scope.review.comments,
                        coffeeShopId: $scope.selectedShop.id
                    })
                    .$promise
                    .then(function() {
                        $state.go('all-reviews');
                    });
            };
        }
    ])
    .controller('DeleteReviewController', ['$scope', 'Review', '$state',
        '$stateParams',
        function($scope, Review, $state, $stateParams) {
            Review
                .deleteById({ id: $stateParams.id })
                .$promise
                .then(function() {
                    $state.go('my-reviews');
                });
        }
    ])
    
    .controller('MenuMegalitosCtrl', ['$scope', '$rootScope',
        function($scope, $rootScope) {

        }
    ]);
    