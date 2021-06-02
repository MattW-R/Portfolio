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
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
}

const tsCompile = () => {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js'))
}

const watch = () => {
    gulp.watch('app/scss/**/*.scss', sassCompile)
    gulp.watch('app/ts/*.ts', tsCompile)
}

exports.sassCompile = sassCompile
exports.tsCompile = tsCompile
exports.watch = watch
