/**
 * Created by terry on 6/17/2015.
 */
app.controller("postCtrl",function($scope,$rootScope,memberService,$modal,$upload, $timeout){
    console.log("Hello World ")
    $scope.post={
        usernameId: memberService.profileObj._id,
        title:"",
        description:"",
        postImg:"",
        created_at:Date.now()
    }

    $scope.submitForm = function(formValid){
        console.log(formValid)
        console.log($scope.post)
        memberService.submitPost($scope.post).then(function(data){
            console.log(data)
            if(data.status ==200){
                $scope.post={
                    usernameId: memberService.profileObj._id,
                    title:"",
                    description:"",
                    postImg:"",
                    created_at:Date.now()
                }
                $rootScope.$broadcast('toasterAlert', "post successful!")
            }
        })
    }
    // =========================================================upload img===============================================================//
    $scope.clickUpload = function(){
        console.log("click upload !")
        angular.element('#productImg').trigger('click');
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
            $scope.post.postImg = data.path;
            //var number = $scope.invoice.items[item];
            //console.log(number);
            //number.productImg = data.path
            //$scope.invoice.items[number] = data.path;
        })

    }
    // =========================================================upload img===============================================================//
})
