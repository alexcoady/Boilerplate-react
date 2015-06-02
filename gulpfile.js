// Dependencies
var gulp = require("gulp");
var browserSync = require("browser-sync");
var connectRewrite  = require("connect-modrewrite");

// Style
var sass = require("gulp-ruby-sass");
var autoprefixer = require("gulp-autoprefixer");

// Browserify
var browserify = require("browserify");
var reactify = require("reactify");
var watchify = require("watchify");
var source = require("vinyl-source-stream");


// Minification
var minifycss = require("gulp-minify-css");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

// Images
var jpegtran = require("imagemin-jpegtran");

// Utility
var gulpif = require("gulp-if");
var argv = require("yargs").argv;
var preprocess = require("gulp-preprocess");





// Low-level tasks
gulp.task("browser-sync", function () {

  browserSync({
    server: {
      baseDir: "./build/",
      middleware: [
        connectRewrite([
          "!\\.\\w+$ /index.html [L]"
        ])
      ]
    },
    open: false
  });
});




gulp.task("scripts", function () {

  var bundler = browserify({
    entries: [ "./source/scripts/main.js" ],
    transform: [ reactify ],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  var watcher = watchify( bundler );

  return watcher
    .on( "update", function () {
      watcher.bundle()
        .pipe( source( "main.js" ) )
        .pipe( gulp.dest( "./build/scripts" ) );
    })
    .bundle()
    .pipe( source( "main.js" ) )
    .pipe( gulp.dest( "./build/scripts" ) );
});


gulp.task("copy:images", function () {

  gulp.src( "./source/images/**/*.*" )
    .pipe( gulpif(argv.production, jpegtran()()) )
    .pipe( gulp.dest("./build/images") );
});


gulp.task("copy:data", function () {

  gulp.src( "./source/data/**/*.*" )
    .pipe( gulp.dest("./build/data") );
});


gulp.task("copy:vendor", function () {

  gulp.src(["./source/scripts/vendor/**/*.*" ])
    .pipe(gulp.dest("./build/scripts/vendor"));
});


gulp.task("copy:html", function () {

  gulp.src( ["./source/*.html"] )
    .pipe( gulp.dest("./build/") );
});


gulp.task("sass", function () {

  sass("./source/style/main.scss")
    .on("error", function ( err ) {
      console.error("Error: sass task", err.message);
    })
    .pipe(autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
    }))
    .pipe( gulpif( argv.production, minifycss()) )
    .pipe( gulpif( argv.production, rename({suffix: ".min"})) )
    .pipe( gulp.dest("./build/") )
    .pipe( browserSync.reload({ stream: true }) );
});


// High level tasks
gulp.task("copy", [ "copy:vendor", "copy:html", "copy:images", "copy:data" ]);

gulp.task("default", [ "scripts", "sass", "copy" ]);

gulp.task("watch", [ "default", "browser-sync" ], function () {

  gulp.watch([ "source/scripts/**/*.{js,json}"], [ "scripts" ] );
  gulp.watch([ "source/*.html" ], [ "copy:html", browserSync.reload ] );
  gulp.watch([ "source/images/**/*.*" ], [ "copy:images" ] );
  gulp.watch([ "source/data/**/*.*" ], [ "copy:data" ] );
  gulp.watch([ "source/style/**/*.scss" ], [ "sass" ]);

  gulp.watch([ "build/**/*.{js,html,css}" ], browserSync.reload );
});
