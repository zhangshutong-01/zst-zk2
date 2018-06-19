var gulp = require("gulp");
var server = require(('gulp-webserver'));
var uglify = require('gulp-uglify');
var scss = require('gulp-sass');
var minCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var url = require('url');
var fs = require('fs');
var path = require('path');
var data = require('./data/data.json');
gulp.task('server', ['scss'], function() {
    gulp.src('src')
        .pipe(server({
            // open: true,
            port: 8080,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/api/data') {
                    res.end(JSON.stringify(data))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }
        }))
});
gulp.task('scss', function() {
    gulp.src('src/scss/**/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('src/css'))
});
gulp.task('minCss', function() {
    gulp.src('src/scss/*.scss', { base: 'src' })
        .pipe(minCss())
        .pipe(gulp.dest('build'))
})
gulp.task('uglify', function() {
    gulp.src('src/js/**/*.js', { base: 'src' })
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});
gulp.task('minify', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'));
});
gulp.task('watch', function() {
    gulp.watch('src/scss/index.scss', ['scss'])
});
gulp.task('default', ['watch', 'server', 'uglify', 'minify', 'minCss'])