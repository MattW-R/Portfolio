const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const sourcemaps = require('gulp-sourcemaps')
const ts = require('gulp-typescript')
const stripDebug = require('gulp-strip-debug')
const minify = require('gulp-minify')
const tsProject = ts.createProject('tsconfig.json')
const size = require('gulp-size')

const sassCompile = () => {
    return gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(size({title: 'scss: '}))
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(size({title: 'css: '}))
        .pipe(cssnano())
        .pipe(size({title: 'nano-css: '}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
}

const tsCompile = () => {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(size({title: 'ts: '}))
        .pipe(tsProject())
        .pipe(size({title: 'js: '}))
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(size({title: 'min-js: '}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js'))
}

const sassBuild = (cb) => {
    gulp.src('app/scss/*.scss')
        .pipe(size({title: 'scss: '}))
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(size({title: 'css: '}))
        .pipe(cssnano())
        .pipe(size({title: 'nano-css: '}))
        .pipe(gulp.dest('app/css'))
    cb()
}

const tsBuild = (cb) => {
    tsProject.src()
        .pipe(size({title: 'ts: '}))
        .pipe(tsProject())
        .pipe(stripDebug())
        .pipe(size({title: 'js: '}))
        .pipe(minify({
            ext:{
                min:'.js'
            },
            noSource: true
        }))
        .pipe(size({title: 'min-js: '}))
        .pipe(gulp.dest('app/js'))
    cb()
}

exports.sassCompile = sassCompile
exports.tsCompile = tsCompile
exports.watch = () => {
    gulp.watch('app/scss/**/*.scss', sassCompile)
    gulp.watch('app/ts/*.ts', tsCompile)
}
exports.buildDev = gulp.series(sassCompile, tsCompile)
exports.build = gulp.series(sassBuild, tsBuild)
