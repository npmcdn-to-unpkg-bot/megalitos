angular
    .module('app')
    .controller('CommentsController', ['$scope','$rootScope', '$sce', 'MegalitosService', 'amMoment', '$stateParams', function($scope,$rootScope, $sce,
        MegalitosService, amMoment, $stateParams) {
        console.log($rootScope.currentUser.id);

        MegalitosService.getComentariosMegalito($stateParams.megalitoId)
            .then(function(comentarios) {
                    console.log(comentarios);
                },
                function(reason) {
                    //reason images
                    console.log(reason);

                });


        var markdown, postAuthorEmail;
        postAuthorEmail = 'jan.kanty.pawelski@gmail.com';
        $scope.comments = [{
            id: 1,
            author: {
                name: 'Joseba Meabebasterretxea',
                email: 'jan.kanty.pawelski@gmail.com',
                website: 'pawelski.io'
            },
            content: 'I made it! My awesome angular comment system. What do you think?',
            createdAt: '2016-06-20T14:10:12.767Z',
            loved: false
        }, {
            id: 2,
            author: {
                name: 'Tomasz Jakut',
                email: 'comandeer@comandeer.pl',
                website: 'comandeer.pl'
            },
            content: 'Nice looking. Good job dude ;)',
            loved: true
        }, {
            id: 3,
            author: {
                name: 'Jan-Kanty Pawelski',
                email: 'jan.kanty.pawelski@gmail.com',
                website: 'pawelski.io'
            },
            content: '<span class="reply">@Tomasz Jakut</span> Thanks man. I tried hard.',
            loved: false
        }, {
            id: 4,
            author: {
                name: 'Grzegorz Bąk',
                email: 'szary.elf@gmail.com',
                website: 'gregbak.com'
            },
            content: 'Third! Amazing system man! By the way check my new website: <a href="//gregbak.com">http://gregbak.com</a>.',
            loved: false
        }];
        $scope.newComment = {};
        markdown = function(string) {
            string = string.replace(/(@.+)@/g, '<span class="reply">$1</span>');
            string = string.replace(/\*\*(.+)\*\*/g, '<strong>$1</strong>');
            string = string.replace(/__(.+)__/g, '<strong>$1</strong>');
            string = string.replace(/\*(.+)\*/g, '<em>$1</em>');
            string = string.replace(/_(.+)_/g, '<em>$1</em>');
            string = string.replace(/``(.+)``/g, '<code>$1</code>');
            string = string.replace(/`(.+)`/g, '<code>$1</code>');
            return string;
        };
        $scope.parseContent = function(content) {
            return $sce.trustAsHtml(content);
        };
        $scope.isAuthor = function(email) {
            return email === postAuthorEmail;
        };
        $scope.getGravatar = function(email) {
            /*var hash;
            if (email === void 0) {
                email = '';
            }
            hash = email.trim();
            hash = hash.toLowerCase();
            hash = md5(hash);
            return '//gravatar.com/avatar/' + hash + '?s=104&d=identicon';
            */
        };
        $scope.loveComment = function(commentId) {
            var comment, i, len, ref, results;
            ref = $scope.comments;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {

                comment = ref[i];
                if (comment.id === commentId) {
                    results.push(comment.loved = !comment.loved);
                } else {
                    results.push(void 0);
                }
            }

            return results;
        };
        $scope.addReply = function(author) {
            if ($scope.newComment.content === void 0) {
                $scope.newComment.content = '';
            }
            if ($scope.newComment.content.search('@' + author + '@') === -1) {
                if ($scope.newComment.content[0] === '@') {
                    $scope.newComment.content = ', ' + $scope.newComment.content;
                } else {
                    $scope.newComment.content = ' ' + $scope.newComment.content;
                }
                return $scope.newComment.content = '@' + author + '@' + $scope.newComment.content;
            }
        };
        $scope.createNewComment = function() {
            /*$scope.newComment.id = $scope.comments.length + 1;
            //$scope.newComment.author.website = $scope.newComment.author.website.replace(/https?:\/\/(www.)?/g, '');
            $scope.newComment.content = markdown($scope.newComment.content);
            $scope.newComment.loved = false;
            $scope.comments.push($scope.newComment);
            return $scope.newComment = {};
            */
            MegalitosService.createComentarioMegalito($stateParams.megalitoId,$rootScope.currentUser.id,$scope.comment.message)
                .then(function(comentarios) {
                        console.log(comentarios);
                    },
                    function(reason) {
                        //reason images
                        console.log(reason);

                    });
        };

        return $scope.$watch('newComment.email', function(newValue, oldValue) {
            var newCommentAvatar;
            newCommentAvatar = document.getElementById('newCommentAvatar');
            return newCommentAvatar.src = $scope.getGravatar($scope.newComment.email);
        });




    }]);
