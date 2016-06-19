angular
    .module('app')
    .factory('AuthService', ['$q', '$rootScope', 'User', '$cookies', function($q,
        $rootScope, User, $cookies) {
        function login(email, password) {
            return User
                .login({ email: email, password: password })
                .$promise
                .then(function(response) {
                    console.log(response);
                    $rootScope.currentUser = {
                        id: response.user.id,
                        tokenId: response.id,
                        email: response.user.email,
                        username: response.user.username
                    };
                    $cookies.key = JSON.stringify($rootScope.currentUser);
                    window.localStorage.setItem("key", JSON.stringify({ username: $rootScope.currentUser.username, email: $rootScope.currentUser.email, password: password }));
                });
        }

        function logout() {
            return User
                .logout()
                .$promise
                .then(function() {
                    $rootScope.currentUser = null;
                });
        }

        function register(username, email, password, aboutYourself) {
            return User
                .create({
                    username: username,
                    email: email,
                    password: password,
                    aboutYourself: aboutYourself
                })
                .$promise.then(function(user) {
                    console.log(user);
                     //window.localStorage.setItem("key", JSON.stringify({ username: user.username, email: user.email, password: user.password }));
                });
        }

        return {
            login: login,
            logout: logout,
            register: register,
        };
    }]);
