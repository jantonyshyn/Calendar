var gulp = require('gulp');
var fs = require("fs");
var {promisify} = require("util");
const readFile = promisify(fs.readFile);

gulp.task('default', ['less', "mustache"], function() {
    gulp.watch('./src/styles/**/*.less', ['less']);
    gulp.watch([
        './src/data/db.json',
        './src/**/*.html'
    ], ['mustache']);
});

var less = require('gulp-less');
var path = require('path');

gulp.task('img', function () {
    return gulp.src('./src/img/**/*.svg')
        .pipe(gulp.dest('./docs/img'));
});

gulp.task('less', function () {
    return gulp.src('./src/styles/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./docs/styles'));
});

var mustache = require("gulp-mustache");
gulp.task("mustache", async () => {
    const data = JSON.parse(await readFile("./src/data/db.json", "utf-8"));

return gulp.src("./src/**/*.html")
    .pipe(mustache(data))
    .pipe(gulp.dest("./docs"));
})
