var gulp = require('gulp'),
    fs = require('fs'),
    through2 = require('through2'),
    $ = require('gulp-load-plugins')({
        lazy: true
    });

module.exports = function(options) {

    var patternsData = [];

    var buildConfig = function(file, enc, callback) {

        var path = require('path');

        // init pattern configs
        var filename = path.basename(file.relative),
            extension = path.extname(file.relative),
            basename = filename.replace(extension, ''),
            patternpath = path.dirname(file.relative),
            title = basename.indexOf('_') === 0 ? basename.substr(1) : basename;

        // create pattern object
        var item = {
            title: title,
            description: '',
            name: basename,
            filename: filename,
            path: patternpath
        };

        // add pattern to patterns
        patternsData.push(item);

        callback(null, file);

    };

    var writeConfigToFile = function() {

        var patternConfig = {
            patterns: patternsData,
            folder: [{
                "name": "atoms",
                "description": "Contains all atom elements"
            }, {
                "name": "molecules",
                "description": "Contains all molecule elements"
            }, {
                "name": "organism",
                "description": "Contains all organism elements"
            }, {
                "name": "templates",
                "description": "Contains all templates elements"
            }, {
                "name": "pages",
                "description": "Contains all pages elements"
            }]
        };

        $.util.log(patternConfig);

        var patterns = JSON.stringify(patternConfig, null, 4);

        fs.writeFile(options.configFile, patterns, function(err) {

            if (err) {
                return $.util.log(
                    $.util.colors.red(err)
                );
            }

            $.util.log(
                $.util.colors.green("The file was saved!")
            );

        });

    };

    var blubs = gulp.src(options.patterns)
        .pipe(through2.obj(buildConfig))
        .on('end', function() {

            return through2.obj(writeConfigToFile());

        });

    return blubs;

};
