var gulp = require('gulp'),
	modernizr = require('gulp-modernizr');

gulp.task('modernizr', function(){
	return gulp.src(['./apps/assets/css/**/*.css', './apps/assets/js/**/*.js'])
		.pipe(modernizr({
			"options": [
				"setClasses"
			]
		}))
		.pipe(gulp.dest('./apps/temp/js/'));
}); 