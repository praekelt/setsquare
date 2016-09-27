var gulp = require('gulp'),
    sass = require('gulp-sass');

var paths = {
    src: __dirname + '/src/',
    dist: __dirname + '/dist/'
}

gulp.task('default', ['styles', 'scripts']);

gulp.task('styles', function() {
    return gulp.src(paths.src + 'styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.dist + 'css'));

});

gulp.task('scripts', function() {
    return gulp.src(paths.src + 'js/**/*.js')
        .pipe(gulp.dest(paths.dist + 'js'));
});
