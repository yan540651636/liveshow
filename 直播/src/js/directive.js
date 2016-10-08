function showLb () {
	return {
		restrict : "AE",
		link : function  (scope,element) {
			var swiper=new Swiper(".swiper-container",{
					pagination:".swiper-pagination",
					autoplay:3000,									//自动滚
					autoplayDisableOnInteraction:false,				//点击也能自动滚
					paginationClickable:true,						//分页能点击
					//slidesPerView:2,								//一页显示俩(滚动一个一个滚)
					//spaceBetween:10,								//分页时候中间间距
					//scrollbar:".swiper-scrollbar",				//滚动条
					//direction:"vertical",							//上下滚
					loop:true										//循环滚
				})
		}
	}
}

function showComment () {
	return {
		restrict : "AE",
		link : function  (scope,element) {
			// element[0].getElementsByTagName('p').forEach(function  (val,i) {
			// 	console.log()
			// 	//val.className = "animated bounceInUp"
			// })
		}
	}
}
function  followEle (myUserData) {
	return {
		restrict : "AE",
		link : function  (scope,ele) {
			// console.log(ele)
			// console.log(scope)
			
			//双击事件初试变量
    		scope.touchtime = 0;
			scope.followThis = function  () {
        
		        //模拟双击事件
		        if( 0 == scope.touchtime ){
		            //第一次点击
		            scope.touchtime = new Date().getTime();
		        }else{
		            if( new Date().getTime() - scope.touchtime < 500 ){

		            	// 时间方法
		            	Date.prototype.format = function (fmt)   { //author: meizz   
							var o = {   
								"M+" : this.getMonth()+1,                 //月份   
								"d+" : this.getDate(),                    //日   
								"h+" : this.getHours(),                   //小时   
								"m+" : this.getMinutes(),                 //分   
								"s+" : this.getSeconds(),                 //秒   
								"q+" : Math.floor((this.getMonth()+3)/3), //季度   
								"S"  : this.getMilliseconds()             //毫秒   
							};   
							if(/(y+)/.test(fmt))   
								fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
							for(var k in o)   
							if(new RegExp("("+ k +")").test(fmt))   
							fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
							return fmt;   
						} 


		                //这里放你要实现的功能代码
		                ele[0].className = "fa fa-heart followele animated bounceInScale";
		                setTimeout(function  () {
		                	ele[0].className = "fa fa-heart followele";
		                },1000)

		                
						myUserData.followData.push({
							headerImg:myUserData.myVideoData.headerImg,
							username:myUserData.myVideoData.title,
							city:myUserData.myVideoData.city,
							time:new Date().format("yyyy-MM-dd hh:mm:ss")
						})
		               		
		            }else{
						//如果第二次点击在第一次点击0.8秒后，
		                //则第二次点击默认为下一次双击判断的第一次点击
		                scope.touchtime = new Date().getTime();
		            }
		        }
		    }
		}
	}
}
angular.module("myapp")
		.directive("showComment",showComment)
		.directive("followEle",followEle)
		.directive("showLb",showLb);