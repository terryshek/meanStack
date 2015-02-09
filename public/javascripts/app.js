/**
 * Created by terryshek on 2/12/14.
 */
var app = angular.module('member', ['ui.bootstrap','angularFileUpload', 'toaster', 'LocalStorageModule', 'angular-ladda']);

app.run(function($rootScope, memberService, localStorageService, $modal, $log, $window,toaster){

    $rootScope.$on('logout',function(){
        console.log("logout!")
        memberService.logout().then(function(res){
            var cookie = localStorageService.cookie.get('login')
            console.log(cookie)
            window.location.href = '/welcome';
        })
    })
    $rootScope.$on('loadingModal', function(){
        $log.info('Loading Modal start at: ' + new Date());
        var modalInstance = $modal.open({
            templateUrl: 'view/processingModal.html',
            controller: 'processingModalCtr',
            size: 'sm'
        });
        modalInstance.result.then(function () {
            $log.info('Loading Modal start at: ' + new Date());
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    })
    $rootScope.$on('toasterAlert',function(event,text){
        console.log(text)
        toaster.pop('success', "", text);
    })
    $rootScope.$on("comfirmBox",function(event,memberobj){
        console.log(memberobj)
        var modalInstance = $modal.open({
            templateUrl: 'view/deleteAlert.html',
            controller: 'deleteCtrl',
            keyboard:false,
            size: 'sm',
            resolve: {
                items: function(){
                    return memberobj
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    })

})
app.directive('numbersOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                // this next if is necessary for when using ng-required on your input.
                // In such cases, when a letter is typed first, this parser will be called
                // again, and the 2nd time, the value will be undefined
                if (inputValue == undefined) return ''
                var transformedInput = inputValue.replace(/[^0-9+.]/g, '');
                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});
app.directive('myPostRepeatDirective', function() {
    return function($scope, element) {

        if ($scope.$last){
            // iteration is complete, do whatever post-processing
            // is necessary
            console.log("render finish!")
            document.getElementById("adminTpl").style.display = "block";
        }
    };
});
