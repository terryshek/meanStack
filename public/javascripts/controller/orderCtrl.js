/**
 * Created by terry on 1/31/2015.
 */
app.controller('orderCtrl',function($scope, $rootScope, $modal, memberService,$log){
    console.log("OrderCtrl")
    $scope.refresh = function(){
        memberService.orderList()
    }
    memberService.orderList()
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

        $scope.showDetail = function(itemObj) {
            console.log(itemObj)
            var modalInstance = $modal.open({
                templateUrl: 'view/orderDetail.html',
                controller: 'orderDetailCtrl',
                size: 'lg',
                resolve: {
                    items: function () {
                        $log.info('Modal created');
                            return itemObj
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
app.controller('orderDetailCtrl',function($scope,items){
    console.log(items)
    $scope.product = items

})