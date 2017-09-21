var gulp = require('gulp'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create();

	

gulp.task('watch',function(){

	browserSync.init({
		server:{
			baseDir:"./apps"
		}
	});
	
	watch('./apps/assets/css/**/*.css', function(){
		gulp.start('cssInject');
	});

	watch('./apps/index.html', function(){
		browserSync.reload();
	});

});

gulp.task('cssInject', ['styles'], function(){
	return gulp.src('./apps/temp/css/style.css')
		pipe(browserSync.stream());
});
