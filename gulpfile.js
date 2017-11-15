var basePaths = {
  node: 'node_modules/',
  src:  'src/',
  sass: 'process/sass/',
  scripts: 'process/scripts/',
  dest: 'build/'
};

var autoprefixer 	= require('autoprefixer');
var del           = require('del');
var gulp 			    = require('gulp');
var concat        = require('gulp-concat');
var postcss 		  = require('gulp-postcss');
var sass 			    = require('gulp-sass');

// Process CSS - compile SASS/minify
gulp.task('css', function() {
  return gulp.src(basePaths.sass + 'style.scss')
  .pipe(sass())
  .pipe(postcss([
    autoprefixer('last 2 versions', '> 1%')
  ]))
  .pipe(gulp.dest(basePaths.dest + 'css'));
});

// Process JS - compile to one file/uglify
gulp.task('js', function() {
  var scripts = [
    basePaths.src + 'jquery/jquery.min.js',
    basePaths.scripts + 'navigation.js'
  ];

  gulp.src(scripts)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(basePaths.dest + 'js/'));
});

// Get assets from node_modules
gulp.task('copy-assets', function() {
  var stream = gulp.src(basePaths.node + 'jquery/dist/jquery.min.js')
    .pipe(gulp.dest(basePaths.src + 'jquery'));

  gulp.src(basePaths.node + 'font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}')
    .pipe(gulp.dest(basePaths.dest + 'fonts/'));

  gulp.src(basePaths.node + 'font-awesome/scss/*.scss')
    .pipe(gulp.dest(basePaths.src + 'font-awesome/'));

  return stream;
});

// Watch for changes
gulp.task('watch', function() {
  gulp.watch(basePaths.sass + '**/*.scss', ['css']);
  gulp.watch(basePaths.scripts + '**/*.js', ['js']);
});

// Gulp
gulp.task('default', ['css', 'js', 'watch']);
