var gulp = require('gulp'),
    gs = require('glob-stream'),
    plumber = require('gulp-plumber'),
    path = require('path'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    merge = require('merge-stream');

module.exports = function() {

    var callDir = process.cwd();

    var config = require(callDir + '/gulp.config.js');

    var hbOptions = {
        handlebars: require('handlebars')
    };

    // partials stream
    var partials = gulp.src(config.pattern + '/**/_*.hbs')
        .pipe(plumber())
        // handlebars
        .pipe(handlebars(hbOptions))
        // wrap inline javascript
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function(fileName) {

                    return JSON.stringify(path.basename(fileName, '.js').substr(1));

                }
            }
        }));

    // template stream
    var templates = gulp.src(config.pattern + '/**/[^_]*.hbs')
        .pipe(plumber())
        // handlebars
        .pipe(handlebars(hbOptions))
        // wrap
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        // namespace
        .pipe(declare({
            namespace: 'App.templates',
            noRedeclare: true
        }));

    // return merge
    return merge(partials, templates)
        // concat
        .pipe(concat('pattern.js'))
        // build
        .pipe(gulp.dest('./app/_config/'));

};
