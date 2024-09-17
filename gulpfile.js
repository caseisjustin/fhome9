const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifycss = require('gulp-uglifycss');
const purgecss = require('gulp-purgecss')

gulp.task('sass', async function () {
        return gulp.src('./sass/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(purgecss({content: ['*.html']}))
            .pipe(gulp.dest('./css'));
    }
);

gulp.task('css', async function () {
        gulp.src('./css/*.css')
            .pipe(minifycss({
                "ugliComments": true
            }))
            .pipe(gulp.dest('./dist/'));
    }
);

gulp.task('run', gulp.series('sass', 'css'));

gulp.task('watch', async function () {
        gulp.watch(['./sass/*.scss', './*.html'], gulp.series('sass'));
        gulp.watch('./css/*.css', gulp.series('css'));
    }
);

gulp.task('default', gulp.series('run', 'watch'));
