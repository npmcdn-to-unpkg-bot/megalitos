angular
    .module('app')
    .controller('MessagesController', ['$scope', '$rootScope', '$state', '$sce', 'MegalitosService', 'amMoment', '$stateParams', function($scope, $rootScope, $state, $sce,
        MegalitosService, amMoment, $stateParams) {
        if ($scope.currentUser) {
            MegalitosService.getUserAllResponses($scope.currentUser.id)
                .then(function(responses) {
                        $scope.messages = responses;
                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });
        }

        $scope.setAvatar = function(message) {
            MegalitosService.getComment(message.comentariosId)
                .then(function(comment) {
                        message.comment = comment.message;
                        message.createdAt = comment.createdAt;
                        message.megalitosId = comment.megalitosId;
                        MegalitosService.getUser(comment.userId)
                            .then(function(user) {
                                    message.avatar = user.avatar;
                                    message.username = user.username;
                                },
                                function(reason) {
                                    //reason images
                                    console.log(reason);

                                });
                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });

        };
        $scope.parseContent = function(content) {
            return $sce.trustAsHtml(content);
        };
        $scope.goToMegalito = function(message) {

            $state.go('megalito', { megalitoId: message.megalitosId });
        };



    }]);
