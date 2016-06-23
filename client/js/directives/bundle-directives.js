angular.module('app')
    .directive('megalitosBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/megalitos-bundle.html',
            controller: 'MegalitosController'


        };
    }).directive('megalitoBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/megalito-bundle.html'


        };
    }).directive('megalitosComunidadBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/megalitos-bundle.html',
             controller: 'MegalitosComunidadController'


        };
    })
    .directive('megalitosUploadBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/megalitos-upload-bundle.html'


        };

    }).directive('signUpBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/sign-up-bundle.html'


        };

    }).directive('avatarBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/avatar-bundle.html'



        };

    });
