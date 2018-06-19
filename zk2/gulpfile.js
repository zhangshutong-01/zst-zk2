var gulp = require("gulp");
var server = require(('gulp-webserver'));
var uglify = require('gulp-uglify');
var scss = require('gulp-sass');
var minCss = require('gulp-clean-css');
var url = require('url');
var fs = require('fs');
var path = require('path');
var data = require('./data/data.json');
gulp.task('server', ['scss'], function() {
    gulp.src('src')
        .pipe(server({
            open: true,
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
        .pipe(minCss())
        .pipe(gulp.dest('src/css'))
});
// gulp.task('uglify', function() {
//     gulp.src('src/js/**/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('build'))
// })
gulp.task('watch', function() {
    gulp.watch('src/scss/index.scss', ['scss'])
});
gulp.task('default', ['watch', 'server'])