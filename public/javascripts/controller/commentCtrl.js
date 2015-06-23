/**
 * Created by terryshek on 8/12/14.
 */
app.controller('commentCtrl', function ($scope, $modal, $log, $http, memberService, resourceData, $rootScope, $q, deferService) {

    //$scope.$broadcast('LOAD');
    $scope.refresh = function(){
        deferService.deferredFn(memberService.getAllPost())
    }
    $scope.refresh()
    $scope.postTyle = "User Tips"
    $scope.$watch(function () {
            return memberService.postList;
            //==bootsrap ui paging
            $scope.totalItems = newVal.length;
            $scope.itemsPerPage = 10
            //console.log(typeof $scope.currentPage)
            $scope.currentPage = (typeof $scope.currentPage == 'number') ? $scope.currentPage : 1;

            $scope.$watch('currentPage + itemsPerPage', function (newVal, oldVal) {
                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage),
                    end = begin + $scope.itemsPerPage;
                $scope.post = $scope.post.slice(begin, end);

                //==bootsrap ui paging
            });
        },
        function (newVal, oldVal) {
            /*...*/
            console.log(newVal)
            $scope.posts = newVal;

        }, true);


    $scope.deleteList = function (memberobj) {
        var postObj = {
            id: memberobj._id,
            title:'Delete confirmation',
            content:'Are you sure to delete this user ?',
            callback: function () {
                memberService.delete(this.id).then(function (res) {
                        console.log(res)

                        memberService.getList();
                    },
                    function () {
                        console.log("delete error")
                    })

            }
        }

        $rootScope.$broadcast("comfirmBox", postObj)
    }
    $scope.open = function (memberObj) {
        //console.log($scope.currentPage)
        var modalInstance = $modal.open({
            templateUrl: 'view/register.html',
            controller: 'addMemberCtrl',
            size: 'sm',
            resolve: {
                items: function () {
                    $log.info('Modal created');

                    //console.log(typeof memberObj)
                    if (typeof memberObj == "object") {
                        memberObj.register = false;
                        memberObj.oldImg = memberObj.imageUrl;
                        return memberObj;
                    } else {
                        var a = {
                            register: true
                        }

                        return a
                    }
                }
            }
        });

        modalInstance.result.then(function () {
            $log.info('Modal created');
        }, function () {
            $scope.loading = false; // start loading
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.open = function (post) {
        //console.log($scope.currentPage)
        var modalInstance = $modal.open({
            templateUrl: 'view/postComment.html',
            controller: 'postCommentCtrl',
            size: 'sm',
            resolve: {
                post_id: function () {
                    $log.info('Modal created');

                    return post._id
                }
            }
        });

        modalInstance.result.then(function () {
            $log.info('Modal created');
        }, function () {
            $scope.loading = false; // start loading
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
})
app.controller('postCommentCtrl', function ($scope, $modal, $log, $http, memberService, resourceData, $rootScope, $q, deferService, post_id) {
    console.log('postCommentCtrl')
    $scope.post_comment ={
        post_id : post_id,
        post_comment:"",
        created_at:Date.now()
    }
    console.log($scope.post_id)
    $scope.commentFormSubmit = function(validation){
        console.log("Submit Post")
        console.log($scope.post_comment)
        if(validation){
            console.log(validation)
            memberService.postComment($scope.post_comment).then(
                function(res){
                    console.log(res)
                }
            )
        }
    }
})

