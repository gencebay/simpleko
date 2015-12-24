// Node modules
var fs = require('fs'), 
    vm = require('vm'), 
    merge = require('deeply'), 
    chalk = require('chalk'), 
    es = require('event-stream');

// Gulp and plugins
var gulp = require('gulp'), 
    rjs = require('gulp-requirejs-bundler'), 
    concat = require('gulp-concat'), 
    clean = require('gulp-clean'),
    replace = require('gulp-replace'), 
    uglify = require('gulp-uglify'), 
    htmlreplace = require('gulp-html-replace'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: 'vendor/requirejs/require'
        },
        include: [
            'requireLib',
            'components/nav-bar/nav-bar',
            'components/home-page/home',
            'text!components/about-page/about.html'
        ],
        insertRequire: ['app/startup'],
        bundles: {
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
        }
    });

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return rjs(requireJsOptimizerConfig)
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'css': 'css.css',
            'js': 'scripts.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass:src', function () {
  gulp.src('./vendor/bootstrap-sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:dist', function () {
  gulp.src('./vendor/bootstrap-sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./vendor/bootstrap-sass/**/*.scss', ['sass']);
});

// dev server
gulp.task('serve:src', function() {
    return connect.server({ root: './src', port: 5002 });
});

// After building, starts a trivial static file server with dependencies []
gulp.task('serve:dist', [], function() {
    return connect.server({ root: './dist', port: 5002 });
});

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('./dist/**/*', { read: false })
        .pipe(clean());
});

gulp.task('default', ['html', 'js', 'sass:src', 'sass:dist'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});
