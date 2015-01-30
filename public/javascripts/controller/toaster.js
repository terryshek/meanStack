/**
 * Created by terryshek on 3/1/15.
 */
app.controller('mainCtrl', function($scope, toaster){
    console.log('Toaster')
    $scope.pop = function(){
        toaster.pop('success', "title", "text");
    };
})