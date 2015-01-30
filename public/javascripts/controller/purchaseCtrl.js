/**
 * Created by terryshek on 29/1/15.
 */
app.controller('purchaseCtrl',function($scope,$rootScope,memberService,$modal){
    console.log('purchaseCtrl')
    $scope.form =
    $scope.countProduct = 1;
    $scope.products = [0]
    $scope.addcol = function(){
    console.log('add')
        $scope.products.push($scope.countProduct)
        $scope.countProduct++
    }
    $scope.submitForm= function(id){
        console.log($scope.form)

    }
})

app.directive("removeMe", function($rootScope) {
    return {
        link:function(scope,element,iAttrs)
        {

            element.bind("click",function() {
                console.log(iAttrs.type)
                var passObj ={
                    title:'Delete confirmation',
                    content:'Are you sure to delete this product ?',
                    callback:function(){
                        document.getElementById(iAttrs.type).remove();
                    }
                }
                $rootScope.$broadcast('comfirmBox',passObj)
            });
        }
    }

});
app.directive("submitForm", function($rootScope) {
    return {
        link:function(scope,element,iAttrs)
        {

            element.bind("click",function() {
                console.log(iAttrs.type)
                //var passObj ={
                //    title:'Delete confirmation',
                //    content:'Are you sure to delete this product ?',
                //    callback:function(){
                //        document.getElementById(iAttrs.type).remove();
                //    }
                //}
                //$rootScope.$broadcast('comfirmBox',passObj)
            });
        }
    }

});