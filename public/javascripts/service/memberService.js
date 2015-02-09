app.service('memberService', function($http, $rootScope, $timeout){
    var _this ={
        url: '/users/',
        profileObj:{},
        list:[]
    };
    _this.getProfile = function(){
        return $http.get("/getProfile")
    }
    _this.getList = function(){
        _this.getProfile().success(function(res){
            console.log(res)
            $http.post(_this.url+"userlist", {username:res.username}).
                success(function(data, status, headers, config) {
                    //angular.forEach(data, function(val,index){
                    //    console.log(val.imageUrl)
                    //})

                    console.log(data)

                    _this.list = data;
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        })
    }
    _this.deletetImg = function(img){
        return $http.post("/deleteImg",img)
    }
    _this.getDataList = function(){
        return  $http.get(_this.url+"userlist")
    }
    _this.add = function(obj){
        return $http.post(_this.url +"adduser",obj)
    }
    _this.update = function(obj){
        console.log(obj);
        return $http.post(_this.url +"update",obj)
}
    _this.upload = function(obj){
        return $http.post("/upload/",obj)
    }
    _this.delete = function(id){
        return $http.delete(_this.url +"deleteuser/"+id)
    }
    _this.deleteQuery =function(id){
        return $http.delete("/deleteQuery/"+id)
    }
    _this.login = function(obj){
        return $http.post("/login", obj)
    }
    _this.checkExit = function(obj){
        return $http.post(_this.url +"checkExit", obj)
    }
    _this.logout = function(obj){
        return $http.get("/logout")
    }
    _this.query = function(obj){
        return $http.post("/query", obj)
    }
    _this.querylist = function(){
        $http.post("/querylist", this.profileObj).success(function(data){
            console.log(data)
            _this.list = data
            if(_this.list.length <=0){
                console.log("run")
                //toaster.pop('note', "", "No record found!");
                $timeout(function() {
                    $rootScope.$broadcast('OffloadingModal')
                }, 1000);
            }
        })
    }
    _this.reponse = function(obj){
        return $http.post("/response",obj)
    }
    _this.purchasing = function(obj){
        return $http.post('/purchasing',obj)
    }
    _this.orderList = function(){
        $http.post("/orderList", this.profileObj).success(function(data){
            console.log(data)
            _this.list = data
            if(_this.list.length <=0){
                console.log("run")
                //toaster.pop('note', "", "No record found!");
                $timeout(function() {
                    $rootScope.$broadcast('OffloadingModal')
                }, 1000);
            }
        })
    }
    return _this
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
