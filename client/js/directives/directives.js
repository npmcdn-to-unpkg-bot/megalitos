angular.module('app')
    .directive('sidebar', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/nav/sidebar.html',



        };
    }).directive('topNavigation', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/nav/top-navigation.html',
            controller: 'SidebarCtrl'



        };
    }).directive('logIn', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/login/log-in.html',
            controller:'MessagesController'

        };
    }).directive('logOut', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/login/log-out.html',
            controller: 'AuthLoginController'

        };
    })
    .directive('megalitosEtiquetas', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/megalitos-etiquetas.html',
            controller: 'EtiquetasController'

        };
    })
    .directive('megalitosPost', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/megalitos-post.html'



        };
    }).directive('megalitoPost', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/megalito-post.html',
            controller: 'MegalitoController'


        };
    }).directive('comments', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/comments.html',
            controller: 'CommentsController'
        };
    }).directive('userComments', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/user-comments.html',
            controller: 'UserCommentsController'
        };
    })
    .directive('map', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/map.html',
            controller: 'MapController'


        };

    }).directive('megalitosUpload', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/megalitos-upload.html',
            controller: 'MegalitosUploadController'


        };

    }).directive('signUp', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/sign-up.html',
            controller: 'SignUpController'


        };

    }).directive('avatar', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/avatar.html',
            controller: 'AvatarController'


        };

    });
