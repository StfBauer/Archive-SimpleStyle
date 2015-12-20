var test = 'hello world';

var gulp = require('gulp'),
    config = require('./gulp.config')('Hello world'),
    ssgCoreConfig = require('./ssg-core/lib/gen-config'),
    ssgCoreCompile = require('./ssg-core/lib/comp-pattern');

gulp.task('debug', function() {

    console.log(config);

});

// task generate file index
gulp.task('config', ssgCoreConfig);

// compile handlebar patterns
