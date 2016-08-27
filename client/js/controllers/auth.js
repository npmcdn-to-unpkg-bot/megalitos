angular
    .module('app')
    .controller('AuthLoginController', ['$scope', '$rootScope', '$http', 'User', '$cookies', 'AuthService', '$state',
        function($scope, $rootScope, $http, User, $cookies, AuthService, $state) {
            $scope.loginAuto = function() {
                if (window.localStorage.getItem("key")) {
                    console.log("beti");
                    userLocal = JSON.parse(window.localStorage.getItem("key"));
                    $scope.user = {
                        email: userLocal.email,
                        password: userLocal.password
                    };
                    AuthService.login($scope.user.email, $scope.user.password)
                        .then(function() {
                            $scope.currentUser = $rootScope.currentUser;
                            //$state.go('megalitos');

                        });
                }

            };

            $scope.login = function() {
                console.log("login");
                AuthService.login($scope.user.email, $scope.user.password)
                    .then(function() {
                        $scope.currentUser = $rootScope.currentUser;
                        //$state.go('megalitos');
                        $state.go($state.current, {}, { reload: true });
                    });
            };
            $scope.logout = function() {
                console.log("hemen");
                AuthService.logout()
                    .then(function() {
                        window.localStorage.clear();
                        $scope.currentUser = null;
                        $scope.user = null;
                        $state.go('megalitos');
                        window.location.reload();
                    }, function(reason) {
                        console.log(reason);
                    });
            };
            $scope.restartPassword = function(email) {
                AuthService.restartPassword(email)
                    .then(function() {

                    }, function(reason) {
                        console.log(reason);
                    });

            };
            $scope.forgetPassword = function() {

            };

            /* if (AuthService.currentUser === null) {
      if ($cookies.access_token) {
        $scope.currentUser =
          AuthService.currentUser = { id: 'social' };
      }
    }
     AuthService.ensureHasCurrentUser(User);
    $scope.currentUser = AuthService.currentUser;
   


    /*$http.get('/auth/account')
            .then(function(response) {
              console.log(response);
              console.log(response.data);
            });
            */

        }
    ])

.controller('SignUpController', ['$scope', 'AuthService', '$state',
    function($scope, AuthService, $state) {
        //animacion para registrarse

        /* $scope.user = {
             name: 'markel',
             lastName: 'mendizabal',
             username: 'markelor',
             email: 'mendimarkel@gmail.com',
             password: 'abcdef',
             repeatPassword: 'abcdef',
             aboutYourself: 'ni informatikaria naiz'
         };
         */
        $(document).ready(function() {
            autosize($('.resizable_textarea'));
        });

        /* $scope.user = {
             username: 'markelor',
             email: 'mendimarkel@gmail.com',
             password: 'jaijaijai',
             aboutYourself: 'ni informatikaria naiz'
         };
         */
        $scope.register = function() {
            AuthService.register($scope.user.username, $scope.user.email, $scope.user.password, $scope.user.aboutYourself)
                .then(function(user) {


                    },
                    function(reason) {
                        console.log(reason);
                    });

        };
    }
]);
