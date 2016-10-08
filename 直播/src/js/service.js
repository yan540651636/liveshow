function api ($http) {
	function getUrl (data) {
		var arr=[];
		for(var i in data){
			arr.push(i+"="+"'"+data[i]+"'")
		}
		return arr.join("&");
	}
	this.getInfor=function  (url,data,type) {
		if (type=="get") {
			var str=getUrl(data);
			console.log(str)
			console.log(url)
			return $http.get(url+"?"+str)	//请求数据
		}else if(type=="jsonp"){
			return $http.jsonp(url)
		}else{
			return $http.post(url,data)
		}
	}
}

function myUserData (localStorageService) {

	var _this = this;

	//直播的数据
	this.myVideoData = {
		"headerImg":"header1.jpg",
        "title":"我是一个粉刷匠",
        "city":"北京",
        "videoSrc":"./video/m7.mp4",
        "look":2345,
        "attention":5678
    };

    //底部数据
	this.footerIco = [
        {
            ico:"fa-film", active:false, url:"/wrap/wrap.video", title:"直播" },
        {
            ico:"fa-road", active:true, url:"/wrap/wrap.hot", title:"热门" },
        {
            ico:"fa-user", active:false, url:"/wrap/wrap.user", title:"我的信息" }
    ]

    //改变底部样式
    this.changeFooterIco = function  (n) {
    	_this.footerIco.forEach(function  (val,i) {
            _this.footerIco[i].active = false;
            if (i==n) {
                _this.footerIco[i].active = true;
            }
        })
    }

    //评论数据
    this.commentData = [
        {
            cName:"总有刁民想睡朕",text:"主播我见过你",classV:"bounce_1"},
        {
            cName:"糖果过",text:"主播你吃激素啦",classV:"bounce_2"},
        {
            cName:"傻呆的小同学",text:"约么",classV:"bounce_3"},
        {
            cName:"嘟嘟",text:"你看我帅么，么么",classV:"bounce_4"},
        {
            cName:"码农届吴彦祖",text:"姑娘，交个朋友好么",classV:"bounce_5"}
    ]

    //关注数据
    this.followData = [
        {
            headerImg:"logo.png",
            username:"总有刁民想睡朕",
            city:"成都",
            time:"2016-03-04 11:11:01"
        }
    ]
  //   this.showVideo = function  () {
  //   	var getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);   
			
		// getUserMedia.call(navigator, {   
		// 		video: true,   
		// 		audio: true   
		// 	}, function(localMediaStream) {   
		// 		var video = document.getElementById('video');   
		// 		video.src = window.URL.createObjectURL(localMediaStream);   
		// 		video.onloadedmetadata = function(e) {   
		// 			console.log("Label: " + localMediaStream.label);   
		// 			console.log("AudioTracks" , localMediaStream.getAudioTracks());   
		// 			console.log("VideoTracks" , localMediaStream.getVideoTracks());   
		// 		};   
		// 	}, function(e) {   
		// 	console.log('Reeeejected!', e);   
		// }); 
  //   }
	   
}

//服务
angular.module("myapp")
		.service("myUserData",myUserData)
		.service("apiService",api);