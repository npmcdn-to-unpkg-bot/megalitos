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
    .directive('megalitoUploadBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/megalito-upload-bundle.html'


        };

    }).directive('signUpBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/sign-up-bundle.html'


        };

    }).directive('userConfigBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/user-config-bundle.html'



        };

    }).directive('favouritesBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/favourites-bundle.html'

        };

    }).directive('userEditMegalitoUploadBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/user-edit-megalito-upload-bundle.html'


        };

    }).directive('adminUsersBundle', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/bundle/admin-users-bundle.html'


        };

    });
