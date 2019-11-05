// globals
var gulp = require("gulp");
var rename = require("gulp-rename");

// minify css
var cleanCSS = require("gulp-clean-css");

// minify js
var terser = require("gulp-terser");

function minifyCSS() {
  return gulp.src("./assets/css/styles.css")
    .pipe(rename("styles.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./assets/css"));
}

function minifyJS() {
  return gulp.src("./assets/js/app.js")
    .pipe(rename("app.min.js"))
    .pipe(terser())
    .pipe(gulp.dest("./assets/js"));
}

exports.default = gulp.parallel(minifyCSS, minifyJS);
