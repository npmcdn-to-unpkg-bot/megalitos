angular
    .module('app')
    .controller('MessagesController', ['$scope', '$rootScope', '$state', '$sce', 'MegalitosService', 'amMoment', '$stateParams', function($scope, $rootScope, $state, $sce,
        MegalitosService, amMoment, $stateParams) {
        $scope.$on("myEvent", function(event, args) {
            $scope.getMessages();
        });
        var userLocal = window.localStorage.getItem("$LoopBack$currentUserId");
        $scope.getMessages=function(){
            MegalitosService.getAllUserResponsesWithoutRead(userLocal)
            .then(function(responses) {
                    $scope.messages = responses;
                },
                function(reason) {
                    //reason images
                    console.log(reason);

                });

        };
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
