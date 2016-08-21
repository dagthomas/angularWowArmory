// Load plugins we need
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

// Configure files for distribution
var config = {
    src: ['app.js'], 
    css: ['css/docs.css','css/custom.css'],
    html: ['partials/*.html'], 
    index: ['index.html'], 
    php: ['php/*.php'], 
    json: ['json/*.*'], 
    settings: ['settings.js'], 
    libraries: ['bower_components/angular/angular.min.js', 'bower_components/angular-material/angular-material.min.js', 'bower_components/angular-aria/angular-aria.min.js', 'bower_components/angular-animate/angular-animate.min.js', 'bower_components/angular-httpi/build/httpi.min.js', 'bower_components/ng-battlenet/dist/ng-battlenet.min.js', 'bower_components/angular-ui-router/release/angular-ui-router.min.js', 'bower_components/angular-filter/dist/angular-filter.min.js', 'bower_components/angular-material-data-table/dist/md-data-table.min.js', 'bower_components/ngstorage/ngStorage.js', 'bower_components/angular-sanitize/angular-sanitize.min.js', 'bower_components/angular-loading-bar/build/loading-bar.min.js'],
    libraryCss: ['bower_components/angular-material/angular-material.css', 'bower_components/angular-loading-bar/build/loading-bar.min.css']
}
// Delete the prior files.
gulp.task('clean', function () {
    return del(['dist/all.min.js']);
});
gulp.task('cleanCss', function () {
    return del(['dist/css/custom.min.css']);
});
gulp.task('cleanHtml', function () {
    return del(['dist/partials/*.html']);
});
gulp.task('cleanIndex', function () {
    return del(['dist/*.html']);
});
gulp.task('cleanIndex', function () {
    return del(['dist/*.html']);
});
gulp.task('cleanLibraries', function () {
    return del(['dist/js/*.js']);
});
gulp.task('cleanLibraryCss', function () {
    return del(['dist/css/library.min.css']);
});

// Run specific scripts
gulp.task('scripts', ['clean'], function () {
    return gulp.src(config.src)
        .pipe(ngAnnotate({
            add: true
        }))
      .pipe(uglify({ mangle: true }))
      .pipe(concat('dist/app.min.js'))
      .pipe(gulp.dest('.'));
});
gulp.task('css', ['cleanCss'], function () {
    return gulp.src(config.css)
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(concat('dist/css/custom.min.css'))
      .pipe(gulp.dest('.'));
});

gulp.task('html', ['cleanHtml'], function () {
  return gulp.src(config.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/partials'));
});
gulp.task('index', ['cleanIndex'], function () {
  return gulp.src(config.index)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('php', function () {
  return gulp.src(config.php)
    .pipe(gulp.dest('dist/php'));
});

gulp.task('json', function () {
  return gulp.src(config.json)
    .pipe(gulp.dest('dist/json'));
});

gulp.task('settings', function () {
  return gulp.src(config.settings)
    .pipe(gulp.dest('dist'));
});
gulp.task('libraries', ['cleanLibraries'], function () {
    return gulp.src(config.libraries)
      .pipe(concat('dist/js/libraries.min.js'))
      .pipe(gulp.dest('.'));
});
gulp.task('libraryCss', ['cleanLibraryCss'], function () {
    return gulp.src(config.libraryCss)
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(concat('dist/css/library.min.css'))
      .pipe(gulp.dest('.'));
});
// Run everything by default.
gulp.task('default', ['scripts', 'css', 'html', 'index', 'php', 'json', 'settings', 'libraries', 'libraryCss'], function () { });

// Used this in visual studio to automatically dump new library.
//gulp.task('watch', function () {
 //   return gulp.watch(config.src, ['scripts']);
//});
