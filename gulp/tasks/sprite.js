var gulp = require('gulp'),
	svgSprite = require('gulp-svg-sprite'),
	rename = require('gulp-rename'),
	del = require('del');

var config = {
	mode:{
		css:{
			sprite:'sprite.svg',
			render:{
				css:{
					template:'./gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task('beginClean', function(){
	return del(['./apps/temp/sprite', './apps/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function(){
	return gulp.src('./apps/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./apps/temp/sprite/'));
}); 

gulp.task('copySpriteGraphics',['createSprite'], function(){
	return gulp.src('./apps/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./apps/assets/images/sprites'));
});

gulp.task('copySpriteCSS',['createSprite'], function(){
	return gulp.src('./apps/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./apps/assets/css/modules'));
});

gulp.task('endClean',['copySpriteGraphics', 'copySpriteCSS'], function(){
	return del('apps/temp/sprite');
});

gulp.task('icons', ['beginClean','createSprite', 'copySpriteGraphics', 'copySpriteCSS', 'endClean' ]);