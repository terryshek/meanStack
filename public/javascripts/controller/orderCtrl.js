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
    $scope.showDetail = function(itemObj){
        console.log(itemObj)
    }
})
app.directive('hoverItem', [ '$parse', '$timeout', function($parse, $timeout) {
    return function(scope, elem, attr) {
        var fn = $parse(attr['showDetail']);
        //elem.bind('change', function(evt) {
        //    var files = [], fileList, i;
        //    fileList = evt.target.files;
        //    if (fileList != null) {
        //        for (i = 0; i < fileList.length; i++) {
        //            files.push(fileList.item(i));
        //        }
        //    }
        //    $timeout(function() {
        //        fn(scope, {
        //            $files : files,
        //            $event : evt
        //        });
        //    });
        //});
        elem.on('click', function(){
            console.log('click')
        });
    };
} ]);