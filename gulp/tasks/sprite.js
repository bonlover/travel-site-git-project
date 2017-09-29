var gulp = require('gulp'),
	svgSprite = require('gulp-svg-sprite'),
	rename = require('gulp-rename'),
	del = require('del'),
	svg2png = require('gulp-svg2png');

var config = {
	shape:{
		spacing: {
			padding: 1 
		}
	},
	mode:{
		css:{
			variables: {
				convertSvgWithPng: function(){
					return function(sprite, render){
						return render(sprite).split('.svg').join('.png');
					}
				}
			},
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

gulp.task('createPngCopy', ['createSprite'], function(){
	return gulp.src('./apps/temp/sprite/css/*.svg')
		.pipe(svg2png())
		.pipe(gulp.dest('./apps/temp/sprite/css'));
}); 

gulp.task('copySpriteGraphics',['createPngCopy'], function(){
	return gulp.src('./apps/temp/sprite/css/**/*.{svg,png}')
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

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphics', 'copySpriteCSS', 'endClean' ]);