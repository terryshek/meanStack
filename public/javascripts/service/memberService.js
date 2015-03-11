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
        return $http.post("/orderList", this.profileObj)
            .then(function(res){
                _this.list = res.data

                console.log(res.data[0].purchaseStatus)
            if(_this.list.length <=0){
                 //toaster.pop('note', "", "No record found!");
                $timeout(function() {
                    $rootScope.$broadcast('OffloadingModal')
                }, 1000);
            }
            //console.log(_this.list.length)
        })
    }
    _this.saveOder =function(obj){
        return $http.post("/saveOrder",obj)
    }
    return _this
});

app.service('resourceData', function(){
    var _this ={}
    _this.profileObj={};
    return _this

})
app.factory('deferService', function ($q, $rootScope) {

    return {
        deferredFn: function (fn) {
            $rootScope.$broadcast('loadingModal')
            var deferred = $q.defer();

            deferred.resolve(fn);

            return deferred.promise;
        },
        orderStatus:function(status){
            console.log(status)
            var this_status;
            switch(status) {
                case 0:
                    this_status ="Pending"
                    break;
                case 1:
                    this_status ="Confirm"
                    break;
                case 2:
                    this_status ="Shipping"
                    break;
                case 3:
                    this_status ="Arrived"
                    break;
            }
            //console.log(this_status)
            return status
        },
        dataForm:function(orderDate){
            var date =  new Date(orderDate)
            var orderDateStr = date.toDateString() // "Thu Dec 29 2011"
            return orderDateStr
        }

    };
});
