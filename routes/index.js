var fs = require('fs');

/*
 * GET home page.
 */

var gallery = require('./gallery')

module.exports = function (app) {

    app.get('/', gallery.indexGet);

    app.get('/api', api);
    app.get('/api/gallery', gallery.indexApi);
    app.get('/api/gallery/search', gallery.searchApi);
    app.all('/api/gallery/upload', gallery.uploadApi);

};

function index (req, res){
  res.render('index', { title: 'iTrip' })
};

/**
 * API Home page listing all apis
 */
function api (req, res) {
    var apis = [ { name: "Gallery", url: '/tripboard/gallery'}, 
                 { name: "Upload", url: '/tripboard/upload'}, 
                 { name: "SearchGallery", url: '/tripboard/searchgallery'} ];

    res.render('api', { apis: apis
                      , title: 'apis' });
}


/**
 * Auto-load all route files under routes dir.
 */
// fs.readdirSync(__dirname).forEach(function(filename){
//     if (/\.js$/.test(filename)) {
//         var name = filename.substr(0, filename.lastIndexOf('.'));
//         if (name != 'index') {
//             exports.__defineGetter__(name, function(){
//                 return require('./' + name);
//             });
//         }
//     }
// });
