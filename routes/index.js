var fs = require('fs');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'iTrip' })
};

/**
 * API Home page listing all apis
 */
exports.api = function (req, res) {
    var apis = [ { name: "Gallery", url: '/tripboard/gallery'}, 
                 { name: "Upload", url: '/tripboard/upload'}, 
                 { name: "SearchGallery", url: '/tripboard/searchgallery'} ];

    res.render('api', { apis: apis
                      , title: 'apis' });
}


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
