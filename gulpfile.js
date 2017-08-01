var gulp = require("gulp");
var connect = require("gulp-connect");
var uglify = require("gulp-uglify");
var obfuscate = require("gulp-obfuscate");
var browserify = require("gulp-browserify");

var rutas = {
	rutaCSS: 'assets/css/*.css',
	rutaJS: 'assets/js/*.js',
	rutaImg: 'assets/img/*',
	rutaFonts: 'assets/fonts/*',
	rutaAssets: 'public/assets',
	rutaNodeModules: 'node_modules/'
};

gulp.task("estilos", function(){
	gulp.src(rutas.rutaNodeModules)
	.pipe(gulp.dest("public"))
});

gulp.task("assets", function(){
	gulp.src('index.html')
	.pipe(gulp.dest("public"))
});

gulp.task("fonts", function(){
	gulp.src(rutas.rutaFonts)
	.pipe(gulp.dest(rutas.rutaAssets + "/fonts"))
});

gulp.task("imgs", function(){
	gulp.src(rutas.rutaImg)
	.pipe(gulp.dest(rutas.rutaAssets + "/img"))
});

gulp.task("prepararCSS", function(){
	gulp.src(rutas.rutaCSS)
	.pipe( gulp.dest(rutas.rutaAssets + "/css"))
});

gulp.task('prepararJS', function(){
	gulp.src(rutas.rutaJS)
	.pipe(uglify())
	.pipe(obfuscate())
	.pipe(browserify())
	.pipe( gulp.dest(rutas.rutaAssets + "/js"))
});
gulp.task('serveprod', function() {
  connect.server({
    root: "./public/",
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});

gulp.task("observar", function(){
	gulp.watch('index.html',['assets']);
	gulp.watch(rutas.rutaCSS,['prepararCSS']);
	gulp.watch(rutas.rutasJS,['prepararJS']);
	gulp.watch(rutas.rutaViews,['views']);
	gulp.watch(rutas.rutaImg,['imgs']);
	gulp.watch(rutas.rutaNodeModules,['assets']);
	gulp.watch('index.html',['estilos']);
});
