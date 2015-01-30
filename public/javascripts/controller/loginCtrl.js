app.controller("loginCtrl", function($scope,memberService,$location, localStorageService, $log,$rootScope){
    console.log("loginCtrl")
    //var el = document.getElementById('loginDialog')
    //
    //angular.element(el).triggerHandler('click');
    //$scope.showModal = true;
    $scope.close = function(){
        $modalInstance.dismiss('cancel');
    };
    $scope.submitAccount = function(){
        console.log($scope.form)
        $scope.loading = true; // start loading
        memberService.login($scope.form).then(function(response){
                console.log(response.data);
                if(response.data.status==200){
                    console.log(response.data.profile)
                    //$rootScope.profileObj = response.data.profile
                    console.log(memberService.profileObj)
                    localStorageService.cookie.set('login', true);
                    //$location.path( '/admin' );
                    window.location.href = '/home';

                }else{
                    $scope.warning = response.data.message
                }
                $scope.loading = false; // stop loading
            },
            function(){
                $scope.loading = false; // stop loading
                console.log("login error")
            })
    }



})
