var test = 'hello world';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    // base application configuration
    config = require('./gulp.config'),
    through2 = require('through2'),
    // custom plugins for simple style guide
    ssgCoreConfig = require('./ssg-core/lib/gen-config'),
    ssgCoreCompile = require('./ssg-core/lib/precomp-pattern');

gulp.task('debug', function(options) {

    console.log(config);

});

var patternPath = config.pattern + '**/*.hbs';

var curConfig = {
    patterns: patternPath,
    configFile: config.patternConfig
};

// task generate file index
gulp.task('gen-config', function() {

    gulp.src(patternPath)
        .pipe(ssgCoreConfig(curConfig));

});

gulp.task('precompile-pattern', ssgCoreCompile);

gulp.task('test', function(){
    ssgCoreCompile(patternPath);
});

// compile handlebar patterns
