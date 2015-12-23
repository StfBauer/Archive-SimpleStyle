var test = 'hello world';

var gulp = require('gulp'),
    watch = require('gulp-watch'),

    // base application configuration
    del = require('del'),

    // custom plugins for simple style guide
    helper = require('./ssg-core/lib/helper'),
    config = require('./gulp.config'),
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

gulp.task('precompile', ssgCoreCompile);

gulp.task('wiredep', function(){

});

gulp.task('clean', function(done) {

    var files2delete = config.tempFiles + '*';

    del(config.tempFiles).then(function() {
        return done();
    });

});

gulp.task('test', function() {

    helper.logMessage('hello world', helper.logType.log);
    helper.logMessage('hello world', helper.logType.error);
    helper.logMessage('hello world', helper.logType.warning);

});

// compile handlebar patterns
