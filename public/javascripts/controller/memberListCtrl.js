/**
 * Created by terryshek on 8/12/14.
 */
app.controller('memberlistCtrl', function ($scope, $modal, $log, $http, memberService, resourceData, $rootScope, $q, deferService) {

    //$scope.$broadcast('LOAD');
    $scope.refresh = function(){
        deferService.deferredFn(memberService.getList())
    }
    $scope.refresh()
    $scope.$watch(function () {
            return memberService.list;
        },
        function (newVal, oldVal) {
            /*...*/
            $scope.memberlist = newVal;
            //==bootsrap ui paging
            $scope.totalItems = newVal.length;
            $scope.itemsPerPage = 10
            //console.log(typeof $scope.currentPage)

            $scope.currentPage = (typeof $scope.currentPage == 'number') ? $scope.currentPage : 1;

            $scope.$watch('currentPage + itemsPerPage', function (newVal, oldVal) {
                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                    end = begin + $scope.itemsPerPage;
                $scope.filteredList = $scope.memberlist.slice(begin, end);

            });
            //==bootsrap ui paging
        }, true);


    $scope.deleteList = function (memberobj) {
        var postObj = {
            id: memberobj._id,
            title:'Delete confirmation',
            content:'Are you sure to delete this user ?',
            callback: function () {
                memberService.delete(this.id).then(function (res) {
                        console.log(res)

                        memberService.getList();
                    },
                    function () {
                        console.log("delete error")
                    })

            }
        }

        $rootScope.$broadcast("comfirmBox", postObj)
    }
$scope.open = function (memberObj) {
    //console.log($scope.currentPage)
    var modalInstance = $modal.open({
        templateUrl: 'view/register.html',
        controller: 'addMemberCtrl',
        size: 'sm',
        resolve: {
            items: function () {
                $log.info('Modal created');

                //console.log(typeof memberObj)
                if (typeof memberObj == "object") {
                    memberObj.register = false;
                    memberObj.oldImg = memberObj.imageUrl;
                    return memberObj;
                } else {
                    var a = {
                        register: true
                    }

                    return a
                }
            }
        }
    });

    modalInstance.result.then(function () {
        $log.info('Modal created');
    }, function () {
        $scope.loading = false; // start loading
        $log.info('Modal dismissed at: ' + new Date());
    });
};
})
