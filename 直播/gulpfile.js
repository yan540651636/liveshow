//引进gulp
var gulp = require("gulp"),
	connect = require("gulp-connect"),
	fs = require("fs"),

	uglify = require("gulp-uglify"),				//压缩拼接
	concat = require("gulp-concat"),

	ngAnnotate = require("gulp-ng-annotate"),		//angular
	ngmin = require("gulp-ngmin"),

	respond = require("gulp-respond"),				//本地服务器编译响应
	clean = require("gulp-clean");					//清除文件
//清空文件
gulp.task("clean",function(){
	return gulp.src(["./src/js/build/"])		//操作文件
				.pipe(clean())						//清空操作文件
})

gulp.task("build",["clean"],function  () {		//压缩图片步骤，首先
	return gulp.src([							//操作文件
			"src/js/myapp.js",
			"src/js/config.js",
			"src/js/controller.js",
			"src/js/directive.js",
			"src/js/service.js"
		])
		.pipe(ngAnnotate())
		.pipe(ngmin())					//上两个angular压缩专用
		.pipe(uglify())					//压缩代码
		.pipe(concat("build.min.js"))	//合并并起个名字
		//.pipe(rev())					//加密
		.pipe(gulp.dest("./src/js/build/"));	//输出加密后的并且压缩后的js到build文件夹
		//.pipe(livereload())
		//.pipe(rev.manifest())					//生成json文件并输出在src内
		//.pipe(gulp.dest("./src/"));
})

gulp.task("connect",function  () {
	connect.server({
		port:8888,
		livereload:true,
		middleware:function  () {
			return [function  (req,res,next) {
				//console.log(req.url)
				next();
			},function  (req,res) {
				var path = req.url.split("?").shift();      //shift剪切第一位返回第一位
				path = path == "/" ? "/index.html" : path;  //如果请求数据时空"/"证明打开默认页

				var url = "src" + path;

				if (!fs.existsSync(url)) {			//判断有没有那个文件，没有的话去bower_components去找静态资源
					url = "bower_components" +path;
					//console.log(url)
				};

				gulp.src(url)						//用完整的url给bower去完成,然后响应在服务器
					.pipe(respond(res))
			}]
		}
	})
})
gulp.task("loadHtml",["build"],function  () {
	gulp.src("src/")
		.pipe(connect.reload());
})
var arr = [
	"src/*.html",
	"src/*/*.css",
	"src/*/*.sass",
	"src/*/*.js",
	"src/*/*.html"
];
gulp.task("watch",function  () {
	gulp.watch(arr,["loadHtml"]);
})
gulp.task("default",["build","watch","connect"]);

