app.service('memberService', function($http, $rootScope, $timeout){
    var memberService ={
        url: '/users/',
        profileObj:{},
        list:[]
    };
    memberService.getProfile = function(){
        return $http.get("/getProfile")
    }
    memberService.getList = function(){
        memberService.getProfile().success(function(res){
            console.log(res)
            $http.post(memberService.url+"userlist", {username:res.username}).
                success(function(data, status, headers, config) {
                    //angular.forEach(data, function(val,index){
                    //    console.log(val.imageUrl)
                    //})

                    console.log(data)

                    memberService.list = data;
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        })
    }
    memberService.deletetImg = function(img){
        return $http.post("/deleteImg",img)
    }
    memberService.getDataList = function(){
        return  $http.get(memberService.url+"userlist")
    }
    memberService.add = function(obj){
        return $http.post(memberService.url +"adduser",obj)
    }
    memberService.update = function(obj){
        console.log(obj);
        return $http.post(memberService.url +"update",obj)
}
    memberService.upload = function(obj){
        return $http.post("/upload/",obj)
    }
    memberService.delete = function(id){
        return $http.delete(memberService.url +"deleteuser/"+id)
    }
    memberService.deleteQuery =function(id){
        return $http.delete("/deleteQuery/"+id)
    }
    memberService.login = function(obj){
        return $http.post("/login", obj)
    }
    memberService.checkExit = function(obj){
        return $http.post(memberService.url +"checkExit", obj)
    }
    memberService.logout = function(obj){
        return $http.get("/logout")
    }
    memberService.query = function(obj){
        return $http.post("/query", obj)
    }
    memberService.querylist = function(){
        $http.post("/querylist", this.profileObj).success(function(data){
            console.log(data)
            memberService.list = data
            if(memberService.list.length <=0){
                console.log("run")
                //toaster.pop('note', "", "No record found!");
                $timeout(function() {
                    $rootScope.$broadcast('OffloadingModal')
                }, 1000);
            }
        })
    }
    memberService.reponse = function(obj){
        return $http.post("/response",obj)
    }
    memberService.purchasing = function(obj){
        return $http.post('/purchasing',obj)
    }
    memberService.orderList = function(){
        $http.post("/orderList", this.profileObj).success(function(data){
            console.log(data)
            memberService.list = data
            if(memberService.list.length <=0){
                console.log("run")
                //toaster.pop('note', "", "No record found!");
                $timeout(function() {
                    $rootScope.$broadcast('OffloadingModal')
                }, 1000);
            }
        })
    }
    return memberService
});

app.service('resourceData', function(){
    var _this ={}
    _this.profileObj={};
    return _this

})
app.factory('deferService', function ($q, $rootScope) {

    $rootScope.$broadcast('loadingModal')

    return {
        deferredFn: function (fn) {
            var deferred = $q.defer();

            deferred.resolve(fn);

            return deferred.promise;
        }

    };
});
