function login ($scope,apiService,$location,$rootScope,myUserData,localStorageService) {

    $scope.newUserData = {
    	username:"",
    	password:""
    }

    $scope.loginGo = function  () {
        $location.url("/wrap/wrap.hot");
        /*apiService.getInfor("http://localhost:3333/data?callback=JSON_CALLBACK","","jsonp")
            .success(function  (e) {
                for(var i in e){
                    //当密码用户名正确
                    //jsonp
                    if (
                        e[i].username == $scope.newUserData.username && 
                        e[i].password == $scope.newUserData.password
                        ) {


                        localStorageService.set('newUserData',$scope.newUserData);

                        //myUserData.myUserData = $scope.newUserData;

                        console.log("登录成功");
                        
                        $location.url("/wrap/wrap.hot");
                        
                    };
                }
            })*/
    }
}

function video ($scope,myUserData) {

    $scope.myVideoData = myUserData.myVideoData;

    $scope.commentData = myUserData.commentData;

    console.log($scope.commentData)

}
function hot ($scope,myUserData,$location,apiService) {
    
    apiService.getInfor("./data/hotData.json","","get")
    .success(function  (e) {
        $scope.hotData = e;
    })
    
//导航点击
    $scope.change = function  (n) {
        myUserData.myVideoData = $scope.hotData[n];

        myUserData.footerIco.forEach(function  (val,i) {
            myUserData.footerIco[i].active = false;
            if (i==0) {
                myUserData.footerIco[i].active = true;
            }
        })

        $location.url("/wrap/wrap.video");   
    }
}

function user ($scope,myUserData,localStorageService,$location,$rootScope) {
    
    $scope.myUserData = localStorageService.get("newUserData");

    console.log($scope.myUserData)

    $scope.wdData = [
        {
            fa:"fa-film",title:"直播",num:"1个",url:"/wrap/wrap.video"},
        {
            fa:"fa-star-o",title:"我的关注",num:myUserData.followData.length+"个",url:"/wrap/wrap.follow"},
        {
            fa:"fa-trophy",title:"收益",num:"200个礼物",url:"/wrap/wrap.user"},
        {
            fa:"fa-laptop",title:"设置",num:"",url:"/wrap/wrap.skin"},
        {
            fa:"fa-reply",title:"退出",num:"",url:"/login"}
    ]

    $scope.user_change = function  (url) {
        var n = 2;

        switch(url){
            case "/wrap/wrap.video": n = 0;break;
            case "/login": n = 1;break;
            case "/wrap/wrap.follow": 
                $rootScope.footerShow = false;
                $rootScope.returnShow = true;
            break;
            case "/wrap/wrap.skin": 
                $rootScope.footerShow = false;
                $rootScope.returnShow = true;
            break;
        }
        
        myUserData.changeFooterIco(n);

        $location.url(url)
    }
}

function follow ($scope,myUserData,$rootScope) {
    $rootScope.newTitle = "我的关注";

    $scope.followData = myUserData.followData;
    
}

function skin ($scope,myUserData,$rootScope) {
    //换肤
    $rootScope.newTitle = "设置";

    $scope.skinData = [
        {"background" : "#96ffff"},
        {"background" : "#50ff00"},
        {"background" : "#ffe300"},
        {"background" : "#ccc"},
        {"background" : "url(./img/bj1.jpg)"},
        {"background" : "url(./img/bj2.jpg)"},
        {"background" : "url(./img/bj3.jpg)"},
        {"background" : "url(./img/bj1.jpg)"}
    ]

    $scope.changeSkin = function  (bj) {
        $rootScope.skinColor = bj;
    }
    
}

function wrap ($scope,$location,myUserData,$rootScope) {

    $rootScope.skinColor = {"background" : "#ffe300"};

    $rootScope.footerShow = true;

    $rootScope.returnShow = false;

    $scope.footerIco = myUserData.footerIco;

    $rootScope.newTitle = "热门";

    $scope.returnBtn = function  (url) {
        $rootScope.footerShow = true;

        $rootScope.returnShow = false;

        $location.url(url)
    }

    $scope.change = function  (n) {
        myUserData.changeFooterIco(n)

        $rootScope.newTitle = myUserData.footerIco[n].title;
        $scope.footerIco = myUserData.footerIco;

        $location.url(myUserData.footerIco[n].url)
    }
}


angular.module("myapp")
        .controller("login",login)         //登录
        .controller("video",video)         //视频
        .controller("hot",hot)             //热点
        .controller("user",user)           //个人中心
        .controller("follow",follow)       //我的关注
        .controller("skin",skin)       //皮肤
        .controller("wrap",wrap);          //大盒子