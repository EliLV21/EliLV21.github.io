var gulp = require("gulp");
var uglify = require("gulp-uglify");
var obfuscate = require("gulp-obfuscate");
var browserify = require("gulp-browserify");
var browserSync = require("browser-sync").create();

var rutas = {
	rutaCSS: 'assets/css/*.css',
	rutaJS: 'assets/js/*.js',
	rutaImg: 'assets/img/*',
	rutaViews: 'views/*.html',
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

gulp.task("views", function(){
	gulp.src(rutas.rutaViews)
	.pipe(gulp.dest("public/views"))
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

gulp.task("observar", function(){
	gulp.watch('index.html',['assets']);
	gulp.watch(rutas.rutaCSS,['prepararCSS']);
	gulp.watch(rutas.rutasJS,['prepararJS']);
	gulp.watch(rutas.rutaViews,['views']);
	gulp.watch(rutas.rutaViews,['imgs']);
	gulp.watch(rutas.rutaViews,['assets']);
	gulp.watch(rutas.rutaViews,['estilos']);
});
