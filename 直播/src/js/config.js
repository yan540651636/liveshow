function config ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
$urlRouterProvider.otherwise("/login");

$stateProvider
    .state("login",{                            //名字
        url:"/login",                           //目录
        templateUrl:"views/login.html",         //文件路径
        controller:"login",                     //绑定控制器
        resolve:{                               //路由当中引入css
            loadMyCtrl:["$ocLazyLoad",function  ($ocLazyLoad) {
                $ocLazyLoad.load("css/style.css");
                $ocLazyLoad.load("css/reset.css");
            }]
        }
    })
    .state("wrap",{                            //名字
        url:"/wrap",                           //目录
        templateUrl:"views/wrap.html",         //文件路径
        controller:"wrap",                     //绑定控制器
        resolve:{                               //路由当中引入css
            loadMyCtrl:["$ocLazyLoad",function  ($ocLazyLoad) {
                $ocLazyLoad.load("css/style.css");
                $ocLazyLoad.load("css/reset.css");
                $ocLazyLoad.load("css/font-awesome.css");
                $ocLazyLoad.load("css/animate.css");
                $ocLazyLoad.load("css/swiper-3.3.1.min.css");
            }]
        }
    })
    .state("wrap.video",{                            //名字
        url:"/wrap.video",                           //目录
        templateUrl:"views/video.html",         //文件路径
        controller:"video"
    })
    .state("wrap.hot",{                            //名字
        url:"/wrap.hot",                           //目录
        templateUrl:"views/hot.html",         //文件路径
        controller:"hot"
    })
    .state("wrap.user",{                            //名字
        url:"/wrap.user",                           //目录
        templateUrl:"views/user.html",         //文件路径
        controller:"user"
    })
    .state("wrap.follow",{                            //名字
        url:"/wrap.follow",                           //目录
        templateUrl:"views/follow.html",         //文件路径
        controller:"follow"
    })
    .state("wrap.skin",{                            //名字
        url:"/wrap.skin",                           //目录
        templateUrl:"views/skin.html",         //文件路径
        controller:"skin"
    })
}
angular.module("myapp")
    .config(config);