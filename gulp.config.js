module.exports = function() {

    // base path of app
    var basepath = './app/',
        appdir = process.cwd() + '/app/',
        temp = basepath + '.tmp/';

    // additional shortcuts
    var config = {
        basepath: basepath,
        patternConfig: basepath + '_config/pattern.conf.json',
        pattern: basepath + '_pattern/',
        docs: basepath + '_pattern.docs/',
        configs: basepath + '_config/',
        preCompTemplates: 'precomp.js',
        tempFiles: temp,
        namespaces: {
            patterns: 'App.Templates',
            coreApp: 'SsgCore.Templates'
        }
    };

    return config;

}();
