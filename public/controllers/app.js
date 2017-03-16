angular.module('chatbot', [])
  .controller('loginController', function ($scope, redirectionValues, $http) {
    $scope.loginData = {};
    $scope.form = {}
    $scope.login = function () {
      if ($scope.form.loginForm.$invalid) {
        angular.forEach($scope.form.loginForm.$error, function (field) {
          angular.forEach(field, function (errorField) {
            errorField.$setTouched();
          })
        });
      } else {

        $http.post('https://qa-api.eteki.com/users/sign_in', $scope.loginData).success(function (data) {

          if (data.success) {
            // alert(redirectionValues.redirectURISuccess+"&authorization_code="+data.authentication_token);

            $http.post('/savetoken', data).success(function (data) {

              console.log(data);
              if (data) {
                window.location.href = redirectionValues.redirectURISuccess + "&authorization_code=" + data.authentication_token;

              }

            }).catch(function (err) {})
          } else {
            $scope.loginData = {}
            $scope.form.loginForm.$setUntouched();
            $scope.error_message = data.message[0]
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    }
  })
