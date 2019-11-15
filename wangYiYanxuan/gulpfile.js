const gulp = require("gulp");

gulp.task("copy-html", function(){
    return gulp.src("index.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload())
})

gulp.task("images", function(){
    return gulp.src("*.{jpg, png, gif}")
    .pipe(gulp.dest("dist/img"))
    .pipe(connect.reload())
})

const sass = require("gulp-sass");
const minifyCss = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("sass", function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("scripts", function(){
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})

gulp.task("data", function(){
    return gulp.src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
})
/* const uglify = require("gulp-uglify");
gulp.task("uglify", function(){
    return 
}) */

gulp.task("build", ["copy-html", "images", "sass", "scripts", "data"]);

gulp.task("watch", function(){
    gulp.watch("index.html", ["copy-html"]);
    gulp.watch("*.{jpg, png, gif}", ["images"]);
    gulp.watch("stylesheet/index.scss", ["sass"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["scripts"])
    gulp.watch(["*.json", "!package.json"], ["data"])
})

const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist",
        port: 8888,
        livereload: true
    })
})

gulp.task("default", ["watch" ,"server"]);