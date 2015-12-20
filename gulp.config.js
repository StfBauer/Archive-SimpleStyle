module.exports = function() {

	// base path of app
    var basepath = './app/';

    // additional shortcuts
    var pathConfigs = {
            basepath: basepath,
            patternConfig: basepath + '_config/pattern.conf.json',
            pattern: basepath + '_pattern/',
            docs: basepath + '_pattern.docs/'
    };

    return pathConfigs;

}();
