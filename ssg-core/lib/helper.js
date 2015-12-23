var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        lazy: true
    });

module.exports = function() {

    var logType = {
        log: 0,
        warning: 1,
        error: 2
    };

    var logMessage = function(msg, level) {

        switch (level) {
            case logType.log:
                {
                    $.util.log(
                        $.util.colors.green('Hello World')
                    );
                    break;
                }
            case logType.error:
                {
                    $.util.log(
                        $.util.colors.red('Hello Error')
                    );
                    break;
                }
            case logType.warning:
                {
                    $.util.log(
                        $.util.colors.yellow('Hello Error')
                    );
                    break;
                }

        }

    };


    return {
        logType: logType,
        logMessage: logMessage
    };

}();
