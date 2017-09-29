var gulp = require('gulp'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cssnano = require('gulp-cssnano'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync').create();

gulp.task('previewDist', function(){
	browserSync.init({
		server:{
			baseDir:"./dist"
		}
	}); 
});


gulp.task('deleteDistFolder', function(){
	return del("./dist");
});

gulp.task('copyImportantFiles', ['deleteDistFolder'], function(){
	var pathsToFiles =[
		'./apps/**/*',
		'!./apps/index.html',
		'!./apps/assets/images/**',
		'!./apps/assets/css/**',
		'!./apps/assets/js/**',
		'!./apps/temp',
		'!./apps/temp/**'
	];

	return gulp.src(pathsToFiles)
		.pipe(gulp.dest('./dist'));
});

gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function(){
	return gulp.src(['./apps/assets/images/**/*', '!./apps/assets/images/icons','!./apps/assets/images/icons/**/*'])
		.pipe(imagemin([
		    imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({plugins: [{removeViewBox: true}]})
		]))
		.pipe(gulp.dest("./dist/assets/images"));
});

gulp.task('usemin',['deleteDistFolder', 'styles', 'scripts'], function(){
	return gulp.src("./apps/index.html")
	.pipe(usemin({
		css: [function(){return rev()}, function(){ return cssnano()}],
		js: [function(){return rev()}, function(){ return uglify()}]
	}))
	.pipe(gulp.dest("./dist"));
});

gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin', 'copyImportantFiles']);