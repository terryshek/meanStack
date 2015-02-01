/**
 * Created by terry on 1/31/2015.
 */
app.controller('orderCtrl',function($scope, $rootScope, $modal, memberService){
    console.log("OrderCtrl")
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
})