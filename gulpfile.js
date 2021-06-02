const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const sourcemaps = require('gulp-sourcemaps')
const ts = require('gulp-typescript')
const minify = require('gulp-minify')
const tsProject = ts.createProject('tsconfig.json')

const sassCompile = () => {
    return gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
}

const cssAutoPrefix = () => {
    return gulp.src('app/css/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
}

const cssCompress = () => {
    return gulp.src('app/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('app/css'))
}

const tsCompile = () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('app/js'))
}

const jsCompress = () => {
    return gulp.src('app/js/*.js')
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('app/js'))
}

const watch = () => {
    gulp.watch('app/scss/**/*.scss', gulp.series(sassCompile, cssAutoPrefix, cssCompress))
    gulp.watch('app/ts/*.ts', gulp.series(tsCompile, jsCompress))
}

exports.sassCompile = sassCompile
exports.cssAutoPrefix = cssAutoPrefix
exports.cssCompress = cssCompress
exports.tsCompile = tsCompile
exports.jsCompress = jsCompress
exports.watch = watch
