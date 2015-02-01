
/**
 * Created by terryshek on 29/1/15.
 */
app.controller('purchaseCtrl',function($scope,$rootScope,memberService,$modal){
    console.log('purchaseCtrl')
    $scope.countProduct = 1;
    $scope.form ={
    }
    $scope.products = [0]
    $scope.addcol = function(){
    console.log('add')
        $scope.products.push($scope.countProduct)
        $scope.countProduct++
    }
    $scope.submitForm= function(){
        var passObj ={
            countProduct:$scope.countProduct,
            productObj:$scope.form,
            title:'Purchase confirmation',
            content:'Are you sure to submit the order ?',
            callback:function(){
                for ( var i = 0; i < passObj.countProduct; i++) {
                    var productObj={
                        product_name:passObj.productObj.product_name[i],
                        product_quanity:passObj.productObj.product_quanity[i],
                        product_description:passObj.productObj.product_description[i]
                    }
                    memberService.purchasing(productObj).then(function(res){
                        console.log(res)
                        $scope.countProduct = 1;
                    })
                }
                console.log(passObj)
            }
        }
        $rootScope.$broadcast("comfirmBox", passObj)
    }
})

app.directive("removeMe", function($rootScope) {
    return {
        link:function(scope,element,iAttrs)
        {

            element.bind("click",function() {
                console.log(iAttrs.type)
                console.log(iAttrs.index)
                var passObj ={
                    title:'Delete confirmation',
                    content:'Are you sure to delete this product ?',
                    callback:function(){
                        document.getElementById(iAttrs.type).remove();
                        angular.forEach(scope.form, function(val,index){
                            delete val[iAttrs.index];
                        })
                        //scope.countProduct--;
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