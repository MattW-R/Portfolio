const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
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

const autoPrefix = () => {
    return gulp.src('app/css/*.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('app/css/dist'))
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
            ignoreFiles: ['*-min.js'],
            noSource: true
        }))
        .pipe(gulp.dest('app/js/dist'))
}

const watch = () => {
    gulp.watch('app/scss/**/*.scss', sassCompile)
    gulp.watch('app/css/*.css', autoPrefix)
    gulp.watch('app/ts/*.ts', tsCompile)
    gulp.watch('app/js/*.js', jsCompress)
}

exports.sass = sassCompile
exports.autoPrefix = autoPrefix
exports.ts = tsCompile
exports.jsCompress = jsCompress
exports.watch = watch
