var fs = require('fs');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'iTrip' })
};

/**
 * Auto-load all route files under routes dir.
 */
fs.readdirSync(__dirname).forEach(function(filename){
    if (/\.js$/.test(filename)) {
        var name = filename.substr(0, filename.lastIndexOf('.'));
        if (name != 'index') {
            exports.__defineGetter__(name, function(){
                return require('./' + name);
            });
        }
    }
});