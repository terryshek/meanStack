/**
 * Created by terryshek on 26/1/15.
 */
app.controller('loginCreate', function ($scope, memberService, $modal, $log, $rootScope ,$timeout, $upload, localStorageService, toaster)  {
    $scope.htmlTooltip = 'Beware cannot change after you register !';

    $scope.form = {
        username:'',
        fullname:'',
        email:'',
        location:'',
        contact:'',
        imageUrl:'/img/defaultImg.jpg',
        gender:true
    };
    $scope.acc = {
        username:'',
        password:'',
    };
    $scope.tabs = [{
        title: 'Login',
        url: 'login.html'
    }, {
        title: 'Sign up',
        url: 'register.html'
    }
    ];
    $scope.currentTab = 'login.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
    $scope.clickUpload = function(){
        console.log("run")
        angular.element('#uploadImg').trigger('click');
    };
    console.log("loginCreate")
    $scope.submitAccount = function () {
        console.log($scope.acc)
        $scope.loading = true; // start loading
        memberService.login($scope.acc).then(function (response) {
                console.log(response.data);
                if (response.data.status == 200) {
                    $rootScope.$broadcast('toasterAlert', "Login successful!")
                    localStorageService.cookie.set('login', true);
                    //$location.path( '/admin' );
                    window.location.href = '/home';

                } else {
                    $timeout(function() {
                        $scope.loading = false; // stop loading
                        $scope.warning = ""
                    }, 1000);
                    $scope.warning = response.data.message
                }
            },
            function () {
                console.log("login error")
            })
    }
    $scope.submitForm= function(){
        console.log($scope.form);
            console.log("add new user !")
            memberService.checkExit({username:$scope.form.username})
                .then(function(res){
                    console.log(res.data.message)
                    if(res.data.message){
                        memberService.checkExit({email:$scope.form.email}).then(function(result){
                            if(result.data.message){
                                memberService.add($scope.form).then(function(){
                                    console.log("Create success")
                                    $scope.submitAccount();

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
    }
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
            //$scope.imageUrl = data.path;
            $scope.form.imageUrl = data.path;
        })

    }
    // =========================================================upload img===============================================================//

})
