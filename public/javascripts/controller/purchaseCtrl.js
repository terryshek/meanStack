
/**
 * Created by terryshek on 29/1/15.
 */
app.controller('purchaseCtrl',function($scope,$rootScope,memberService,$modal,$upload, $timeout){
    console.log('purchaseCtrl')
    function productObj(){
        return {
            product_quanity: 1,
            product_name:"",
            productImg:"/img/undefined.png",
            product_description: ''
        }
    }
    $scope.invoice = {
        items: [new productObj()]
    };
    $scope.addcol = function(){
        $scope.invoice.items.push(new productObj());
    }
// =========================================================upload img===============================================================//
    $scope.clickUpload = function(index){
        //console.log(index)
        angular.element('#productImg_'+index).trigger('click');

        //document.getElementById("timerValue").trigger('click');
    };
    $scope.abort = function(index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
    };
//	$scope.angularVersion = window.location.hash.length > 1 ? window.location.hash.substring(1) : '1.2.0';

    $scope.onFileSelect = function($files, item) {
        console.log(item)
        $rootScope.$on('loadingModal')
        $scope.selectedFiles = [];
        //$scope.progress = [];
        $scope.upload = [];
        $scope.uploadResult = [];
        $scope.selectedFiles = $files;
        $scope.dataUrls = [];
        for ( var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            if (window.FileReader && $file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($files[i]);
                var loadFile = function(fileReader, index) {
                    fileReader.onload = function(e) {
                        $timeout(function() {
                            $scope.dataUrls[index] = e.target.result;
                        });
                    }
                }(fileReader, i);
            }
            $scope.start(i, item);
        }
    }

    $scope.start = function(index, item) {
        //$scope.progress[index] = 0;
        $scope.upload[index] = $upload.upload({
            url : 'upload',
            method: 'POST',
            headers: {'my-header': 'my-header-value'},
            data : {
                myModel : $scope.myModel
            },
            file: $scope.selectedFiles[index],
            fileFormDataName: 'myFile'
        }).progress(function(evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
        }).success(function(data, status, headers, config) {
            // file is uploaded successfully
            console.log(data);

            var number = $scope.invoice.items[item];
            console.log(number);
            number.productImg = data.path
            //$scope.invoice.items[number] = data.path;
        })

    }
    // =========================================================upload img===============================================================//

    $scope.removeItem = function(index) {
        $scope.invoice.items.splice(index, 1);
    }
    $scope.submitForm= function(){
        console.log($scope.invoice.items)
        var passObj ={
            productObj:$scope.invoice.items,
            title:'Purchase confirmation',
            content:'Are you sure to submit the order ?',
            callback:function(){
                    memberService.purchasing(passObj.productObj).then(function(res){
                        console.log(res.status)
                        if(res.status =200){
                            $rootScope.$broadcast('toasterAlert',"Order successful!")
                        }
                    })
                console.log(passObj)
            }
        }
        $rootScope.$broadcast("comfirmBox", "Order successful!")
    }
})