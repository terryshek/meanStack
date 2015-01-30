/**
 * Created by terryshek on 12/1/15.
 */
app.controller('hometCtrl',function($scope, memberService, $rootScope, deferService,$modal, $log, toaster,$timeout){
    console.log("home")
    $scope.role = memberService.profileObj.role
    memberService.querylist();
    $scope.$watch(function () {
            return memberService.list;
        },
        function(newVal, oldVal) {
            /*...*/
            $scope.list  = newVal;
            //==bootsrap ui paging
            $scope.totalItems = newVal.length;
            $scope.itemsPerPage = 10
            console.log(typeof $scope.currentPage)

            $scope.currentPage = (typeof $scope.currentPage=='number')?$scope.currentPage:1;

            $scope.$watch('currentPage + itemsPerPage', function(newVal, oldVal) {
                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                    end = begin + $scope.itemsPerPage;
                $scope.filteredList = $scope.list.slice(begin, end);

            });
            //==bootsrap ui paging
        }, true);
    $scope.status = function(status){
        if(status){
            return "Answered"
        }else{
            return "No yet answered"
        }
    }
    $scope.deleteQuery=function(query){
        //console.log(query)
        var passObj ={
            id:query._id,
            title:'Delete confirmation',
            content:'Are you sure to delete this record ?',
            callback:function(){
                memberService.deleteQuery(query._id).then(function(res){
                        console.log(res)
                        memberService.querylist();
                    },
                    function(){
                        console.log("delete error")
                    })
            }
        }
        $rootScope.$broadcast('comfirmBox',passObj)
    }
    $scope.queryBox = function(queryObj){
        console.log("open edit")
        var modalInstance = $modal.open({
            templateUrl: 'view/queryPopUp.html',
            controller: 'queryPopUpCtrl',
            size: 'sm',
            resolve: {
                items: function(){

                        return queryObj;

                }
            }
        });

        modalInstance.result.then(function () {
            $log.info('Modal created');
        }, function () {
            $scope.loading = false; // start loading
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
})
app.controller('queryPopUpCtrl',function($scope, items, $modalInstance, $rootScope,memberService){
    $scope.form = items
    $scope.role = memberService.profileObj.role
    $rootScope.close = function(){
        $modalInstance.dismiss('cancel');
    };

    console.log($scope.form)
    $scope.submitForm = function(){
        console.log("submit Querry !")
        $scope.form.ans_status = true;
        var postObj={
            username:$scope.form.username,
            responseMsg:$scope.form.responseMsg,
            title:$scope.form.title,
            responseTime:new Date().getMonth()+1 + "-" + new Date().getDate() + "-" + new Date().getFullYear(),
            ans_status:$scope.form.ans_status
        }
        console.log(postObj)
        memberService.reponse(postObj).then(function(res){
            console.log(res)
            //$timeout(function() {
                if(res.status == 200){
                    $rootScope.close()
                }
                //$rootScope.$broadcast('OffloadingModal')
            //}, 1000);
        })
    }
})