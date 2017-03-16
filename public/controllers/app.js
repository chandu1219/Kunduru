angular.module('chatbot', [])
    .controller('loginController', function($scope, redirectionValues, $http) {
        $scope.loginData = {};
        $scope.form = {}
        $scope.login = function() {
            if ($scope.form.loginForm.$invalid) {
                angular.forEach($scope.form.loginForm.$error, function(field) {
                    angular.forEach(field, function(errorField) {
                        errorField.$setTouched();
                    })
                });
            } else {

                $http.post('https://qa-api.eteki.com/users/sign_in', $scope.loginData).success(function(data) {

                    if (data.success) {
                        // alert(redirectionValues.redirectURISuccess+"&authorization_code="+data.authentication_token);
                        window.location.href = redirectionValues.redirectURISuccess+"&authorization_code="+data.authentication_token;
                    }
                }).catch(function(err) {
                    console.log(err);
                })
            }
        }
    })
