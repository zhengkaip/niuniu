var gulp=require("gulp");
var minimg=require("gulp-imagemin")//压缩image
var mincss=require("gulp-minify-css");//css压缩
var uglify=require("gulp-uglify");//js压缩
var minhtml=require("gulp-minify-html");//html压缩
var concat=require("gulp-concat");//合并文件
var changed=require("gulp-changed")//只编译改动过的文件
var debug=require("gulp-debug");//打印出处理的文件
var rev=require("gulp-rev")//生成版本号
var revCollector=require("gulp-rev-collector")//替换有版本号的文件
var sequence=require("run-sequence")//同步加载模式
var browserSync=require("browser-sync").create()//打开浏览器并刷新
var pngquant=require("imagemin-pngquant")//使用pngquant深度压缩png图片的imagemin插件

gulp.task("default",function(){
	sequence(["build"],["server"])
})
gulp.task("build",function(callback){
	return sequence(['minimg','mincss',"minjs","minhtml"],["watch"],callback)
});
gulp.task("minimg",function(){
	return gulp.src(["src/images/*.{png,jpg,gif,ico}"])
	/*.pipe(revCollector({replaceReved:true}))*/
	.pipe(changed("dist/images",{extension:".png"||".jpg"||".gif"||".ico"}))
	.pipe(debug({title: '编译:'}))
	.pipe(minimg({
		progressive:true,//类型：Boolean 默认：false 无损压缩jpg图片
		optimizationLevel:5,//类型：Number  默认：3  取值范围：0-7（优化等级）
		interlaced:true,//类型：Boolean 默认：false 隔行扫描gif进行渲染
		muntipass:true,//类型：Boolean 默认：false 多次优化svg直到完全优化
		svgoPlugins:[{removeViewBox:false}],//不要移除svg的viewbox属性
		use:[pngquant()]//使用pngquant深度压缩png图片的imagemin插件
	}))
	.pipe(debug({title:"minimg"}))
	.pipe(gulp.dest("dist/images"))
	.pipe(rev())
	.pipe(rev.manifest())
	.pipe(gulp.dest("dist/rev/imagesmin"))
})
gulp.task("mincss",function(){
	return gulp.src(["src/css/*.css"/*,"dist/css/*.css","dist/rev/cssmin"*/])
	.pipe(changed("dist/css",{extension:'.css'}))
	.pipe(debug({title: '编译:'}))
	.pipe(revCollector({replaceReved:true}))
	.pipe(mincss())
	.pipe(debug({title:"mincss"}))
	.pipe(gulp.dest("dist/css"))
	.pipe(rev())//生成版本号
	.pipe(rev.manifest())//把版本号写到rev-manifest.json配置文件里
	.pipe(gulp.dest("dist/rev/cssmin"))
})
/*gulp.task("minjs",function(){
	return gulp.src(["src/js/*.js"])
	.pipe(revCollector({replaceReved:true}))
	.pipe(uglify())
	.pipe(debug({title:"minjs"}))
	.pipe(gulp.dest("dist/js/"))
	.pipe(rev())
	.pipe(rev.manifest())
	.pipe(gulp.dest("dist/rev/jsmin"))
})*/
gulp.task("minjs",function(){
    return gulp.src("src/js/*.js")
   /* .pipe(revCollector({replaceReved:true}))*/
   	.pipe(changed("dist/js",{extension:'.js'}))
   	.pipe(debug({title: '编译:'}))
    .pipe(uglify().on("error",function(e){
    	console.log(e)
    }))//压缩js
    .pipe(debug({title:"jsmin"}))//查看处理的文件
    .pipe(gulp.dest("dist/js"))
    .pipe(rev())//生成版本号
    .pipe(rev.manifest())//生成版本文件
    .pipe(gulp.dest("dist/rev/jsmin"))//将版本号文件放在dist/rev/jsmin文件里面
})
gulp.task("minhtml",function(){
	return gulp.src(["src/**/*.html"/*,"dist/rev/cssmin/*.json","dist/rev/jsmin/*.json"*/])//读取文件
	.pipe(changed("dist",{extension:'.html'}))
	.pipe(debug({title: '编译:'}))
	.pipe(revCollector({replaceReved:true}))
	.pipe(minhtml())
	.pipe(debug({title:"minhtml"}))
	.pipe(gulp.dest("dist"))
	.pipe(rev())//生成版本号
	.pipe(rev.manifest())
	.pipe(gulp.dest("dist/rev/htmlmin"))
})
gulp.task("watch",function(){
	return gulp.watch(["src/*.html","src/css/*.css","src/images/*","src/js/*.js"],["reload"])
});
gulp.task("reload",function(){
	return sequence(["build"],["reload-browser"])
});
gulp.task("reload-browser",function(){
	return browserSync.reload()
});
gulp.task('server', function() {
    return browserSync.init({
      server: {
        baseDir: './src/'
      },
      port:8088
    });
  });