const {src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(callback){
    src("src/scss/app.scss")
        .pipe(sass())
        .pipe(dest("build/css"));

    callback();
}

function dev(callback){
    watch("src/scss/app.scss", css);

    callback();
}
exports.css = css;
exports.dev = dev;