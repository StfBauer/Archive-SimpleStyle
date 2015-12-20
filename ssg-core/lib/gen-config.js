var gulp = require('gulp'),
    fs = require('fs'),
    through2 = require('through2'),
    $ = require('gulp-load-plugins')({
        lazy: true
    });

module.exports = function(options) {

    var patternsData = [];

    var statistics = 0;

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

        // check if pattern currently exists in patterns
        var found = patternsData.filter(function(obj) {
            return obj.path === item.path;
        })

        // add pattern to patterns
        if (found.length === 0) {
            patternsData.push(item);
            statistics += 1;
        }

        callback(null, file);

    };

    var writeConfigToFile = function() {

        var patternConfig = {
            patterns: patternsData,
            folder: [{
                'name': 'atoms',
                'description': 'Contains all atom elements'
            }, {
                'name': 'molecules',
                'description': 'Contains all molecule elements'
            }, {
                'name': 'organism',
                'description': 'Contains all organism elements'
            }, {
                'name': 'templates',
                'description': 'Contains all templates elements'
            }, {
                'name': 'pages',
                'description': 'Contains all pages elements'
            }]
        };

        var patterns = JSON.stringify(patternConfig, null, 4);

        fs.writeFile(options.configFile, patterns, function(err) {

            if (err) {
                return $.util.log(
                    $.util.colors.red(err)
                );
            }

            $.util.log(
                $.util.colors.green('The file was saved!')
            );

        });

    };

    var loadCurrentConfig = function() {

        $.util.log('... Loading current configuration');

        var curConfigPath = options.configFile;

        var exits;

        try {

            exists = fs.statSync(curConfigPath);

        } catch (erro) {

            exists = null;
            return;

        }

        try {

            // Loading old configuration
            var config = fs.readFileSync(options.configFile);

            // parse json config
            configData = JSON.parse(config);

            // check if configuration data exits
            patternsData = configData !== undefined &&
                configData.patterns !== undefined ? configData.patterns : [];

            $.util.log(
                'Found',
                patternsData.length,
                'pattern(s).');

        } catch (err) {

            $.util.log($.util.colors.red(err));

        }

    };

    var logStatistics = function(){
        $.util.log(
            'Found',
            statistics === 0 ? 'no new pattern' : $.util.colors.green(statistics) + ' new pattern'
            );
    }

    var blubs = gulp.src(options.patterns)
        .pipe(through2.obj(loadCurrentConfig()))
        .pipe(through2.obj(buildConfig))
        .on('end', function() {
            logStatistics();
            return through2.obj(writeConfigToFile());
        });

    return blubs;

};
