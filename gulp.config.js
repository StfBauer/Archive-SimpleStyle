module.exports = function() {

    var options = {
        basepath: './app/',
        baseconfig: {
            basepath: global.basepath,
            config: global.basepath + '_config/pattern.conf.json',
            pattern: global.basepath + '_pattern/',
            docs: global.basepath + '_pattern.docs/'
        }
    };

    return options;

}();
