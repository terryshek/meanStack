
app.controller('addMemberCtrl', function($rootScope,$scope, $modalInstance, memberService ,items, $timeout, $upload, toaster){
    $scope.form = items
    $scope.showBtn = ($scope.form.register)?'register':'update';
    $scope.form.gender =(items.register)?true:items.gender;

    $rootScope.close = function(){
        $modalInstance.dismiss('cancel');
    };

    $scope.addMember=function(){
        //console.log($scope.form);
        memberService.add($scope.form).then(function(){
            console.log("Create success")
            memberService.getList();
            $scope.close();
        }, function(){
            console.log("sendError")
        })
    }
    $scope.submitForm= function(){
        console.log($scope.form);
        if($scope.form.register){
            console.log("add new user !")
            memberService.checkExit({username:$scope.form.username})
                .then(function(res){
                    console.log(res.data.message)
                    if(res.data.message){
                        memberService.checkExit({email:$scope.form.email}).then(function(result){
                            if(result.data.message){
                                memberService.add($scope.form).then(function(){
                                    console.log("Create success")
                                    memberService.getList();
                                    $scope.close();

                                }, function(){
                                    console.log("sendError")
                                })
                            }else{
                                console.log('email already exit !')
                            }
                        })
                    }else{
                        console.log('username already exit !')
                    }
                });


        }else{
            console.log("update user !")
            console.log($scope.form.imageUrl == $scope.form.oldImg)
            if($scope.form.imageUrl != $scope.form.oldImg){
                console.log("Img update !")
                var deleteObj = {username:$scope.form.username, img:$scope.form.oldImg}
                memberService.deletetImg(deleteObj).then(function(data){
                    console.log(data)
                })
            }
            memberService.update($scope.form).then(function(){
                console.log("Update success")
                memberService.getList();
                $scope.close();
            },function(){
                console.log("sendError")
            })
        }
    }
    $scope.update = function(){
        memberService.update($scope.form, $scope.form._id).then(function(){
            console.log("Update success")
            memberService.getList();
            $scope.close();
        },function(){
            console.log("sendError")
        })
    }

    // =========================================================upload img===============================================================//
    $scope.abort = function(index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
    };
//	$scope.angularVersion = window.location.hash.length > 1 ? window.location.hash.substring(1) : '1.2.0';

    $scope.onFileSelect = function($files) {
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
            $scope.start(i);
        }
    }

    $scope.start = function(index) {
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
            $scope.form.imageUrl = data.path;
        })

    }
    // =========================================================upload img===============================================================//
})
app.controller('deleteCtrl',function($scope, $modalInstance, items, memberService, $timeout){
    //$scope.deleteId = items;
    console.log(items)
    $scope.title = items.title;
    $scope.content = items.content;
    $scope.close = function(){
        $modalInstance.dismiss('cancel');
    };
    $scope.confirm = function() {
        console.log("confirm")
        items.callback();
        $timeout(function(){
            $scope.close()
        },1000)

    }

})

