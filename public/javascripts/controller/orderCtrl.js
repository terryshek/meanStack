/**
 * Created by terry on 1/31/2015.
 */
app.controller('orderCtrl',function($scope, $rootScope, $modal, memberService,$log,deferService,$rootScope){
    console.log("OrderCtrl")

    $scope.refresh = function(){
        deferService.deferredFn(memberService.orderList())
    }

    deferService.deferredFn(memberService.orderList())

    $scope.$watch(function () {
            return memberService.list;
        },
        function(newVal, oldVal) {
            /*...*/
            $scope.list  = newVal;
            //==bootsrap ui paging
            $scope.totalItems = newVal.length;
            $scope.itemsPerPage = 10
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
    $scope.dateFormat = function(orderDate){
       return deferService.dataForm(orderDate)
    };
    $scope.orderStatus = function(status){
        return deferService.orderStatus(status);

    };

})
app.controller('orderDetailCtrl', function ($scope, items, memberService, $rootScope,$modalInstance) {
    console.log(items)
    $scope.product = items
    $scope.items = [{status: 'Pending',value:0 },{ status: 'Confirm',value:1},{ status: 'Shipping',value:2},{ status: 'Arrived',value:3}];
    $scope.submitOrderForm = function () {
        console.log($scope.selectStatus)
        $scope.product.purchaseStatus = $scope.selectStatus;
        memberService.saveOder(
            $scope.product
        ).then(function (res) {
                if (res.status = 200) {
                    $rootScope.$broadcast('toasterAlert', "Change successful!")
                    $modalInstance.dismiss('cancel');
                }
            }, function () {
                console.log('send error!')
            })
    }
    $scope.changeValue =function(){
        console.log($scope.selectStatus)
        $scope.product.purchaseStatus = $scope.selectStatus;
        console.log($scope.product.purchaseStatus)
    }
})