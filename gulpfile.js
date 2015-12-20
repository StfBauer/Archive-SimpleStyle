var test = 'hello world';

var gulp = require('gulp'),
    // base application configuration
    config = require('./gulp.config'),
    // custom plugins for simple style guide
    ssgCoreConfig = require('./ssg-core/lib/gen-config'),
    ssgCoreCompile = require('./ssg-core/lib/comp-pattern');

gulp.task('debug', function(options) {

    console.log(config);

});

// task generate file index
gulp.task('gen-config', function() {

    var patternPath = config.pattern + '**/*.hbs';

    var curConfig = {
    	patterns: patternPath,
    	configFile: config.patternConfig
    };

    return gulp.src(patternPath)
    	.pipe(ssgCoreConfig(curConfig));
});

// compile handlebar patterns
