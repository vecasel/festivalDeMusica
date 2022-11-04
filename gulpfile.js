//Gulp
const {src, dest, watch, parallel} = require("gulp");

//Css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

//Images
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

//Js
const terser = require("gulp-terser-js");


function css(callback){
    src("src/scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));

    callback();
}

function images(callback){
    const options = {
        optimizationLevel : 3
    };
    src("src/img/**/*.{png,jpg}")
        .pipe(cache(imagemin(options)))
        .pipe(dest("build/img"));
    callback();
}

function versionWebp(callback){
    const options = {
        quality: 50
    };
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(options))
        .pipe(dest("build/img"));
    callback();
}

function versionAvif(callback){
    const options = {
        quality: 50
    };
    src("src/img/**/*.{png,jpg}")
        .pipe(avif(options))
        .pipe(dest("build/img"));
    callback();
}

function javaScript(callback){
    src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/js"));
    callback();
}

function dev(callback){
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javaScript);
    callback();
}
exports.css = css;
exports.js = javaScript;
exports.images = images
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(images, versionWebp, versionAvif, dev);