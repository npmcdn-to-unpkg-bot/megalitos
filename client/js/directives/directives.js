angular.module('app')
    .directive('autoGrow', ["$parse", function($parse) {

        return function(scope, element, attr) {
            var minHeight = element[0].offsetHeight,
                paddingLeft = element.css('paddingLeft'),
                paddingRight = element.css('paddingRight');

            var $shadow = angular.element('<div></div>').css({
                position: 'absolute',
                top: -10000,
                left: -10000,
                width: element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),
                fontSize: element.css('fontSize'),
                fontFamily: element.css('fontFamily'),
                lineHeight: element.css('lineHeight'),
                resize: 'none'
            });
            angular.element(document.body).append($shadow);

            var update = function() {
                var times = function(string, number) {
                    for (var i = 0, r = ''; i < number; i++) {
                        r += string;
                    }
                    return r;
                };

                var val = element.val().replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/&/g, '&amp;')
                    .replace(/\n$/, '<br/>&nbsp;')
                    .replace(/\n/g, '<br/>')
                    .replace(/\s{2,}/g, function(space) {
                        return times('&nbsp;', space.length - 1) + ' ';
                    });
                $shadow.html(val);

                element.css('height', Math.max($shadow[0].offsetHeight + 10 /* the "threshold" */ , minHeight) + 'px');
            };

            element.bind('keyup keydown keypress change', update);
            update();
        };

    }]).directive('validFile', function() {
        return {
            require: 'ngModel',
            link: function(scope, el, attrs, ngModel) {
                //change event is fired when file is selected
                el.bind('change', function() {
                    scope.$apply(function() {
                        ngModel.$setViewValue(el.val());
                        ngModel.$render();
                    });
                });
            }
        };
    }).directive('sidebar', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/nav/sidebar.html',
           


        };
    }).directive('topNavigation', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/nav/top-navigation.html',
             controller:'SidebarCtrl'
            


        };
    }).directive('logIn', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/login/log-in.html'

        };
    }).directive('logOut', function() {

        return {
            restrict: 'E',
            templateUrl: 'views/login/log-out.html',
            controller:'AuthLoginController'

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
