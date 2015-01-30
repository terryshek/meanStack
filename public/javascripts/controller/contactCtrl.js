/**
 * Created by terryshek on 27/1/15.
 */
app.controller('contactCtrl',function($scope, memberService,$rootScope, toaster, $timeout){
    $scope.form = memberService.profileObj
    console.log($scope.form)
    $scope.submitQuery = function(){
        $rootScope.$broadcast('loadingModal')
        memberService.query($scope.form).then(function(res){
            //console.log(res)
            $timeout(function() {
                if(res.status == 200){
                    toaster.pop('success', "", "Send successful!");
                }
                $rootScope.$broadcast('OffloadingModal')
            }, 1000);

        })
    }
})
