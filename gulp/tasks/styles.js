var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	postcssVars = require('postcss-simple-vars'),
	postcssNested = require('postcss-nested'),
	cssImport = require('postcss-import'),
	mixins = require('postcss-mixins');

gulp.task('styles',function(){
	return gulp.src('./apps/assets/css/style.css')
		.pipe(postcss([cssImport, mixins, postcssVars, postcssNested, autoprefixer]))
		.on('error', function(errorInfo){
			console.log(errorInfo);
			this.emit('end');
		})
		.pipe(gulp.dest('./apps/temp/css'));
});