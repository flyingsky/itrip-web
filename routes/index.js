var fs = require('fs');

/*
 * GET home page.
 */
var objUtil = require("../lib/object-utils"),
    gallery = require('./gallery');

module.exports = function (app) {

    app.get('/', gallery.index);
    app.get('/index', gallery.index);
    app.get('/api', api);

    fs.readdirSync(__dirname).filter(isFileToBeAutoLoad).forEach(addRoutes.bind({}, app, ''));
    fs.readdirSync(__dirname + '/api').forEach(addRoutes.bind({}, app, '/api'));

};

function index (req, res){
  res.render('index', { title: 'iTrip' });
};

/**
 * API Home page listing all apis
 */
function api (req, res) {
    //FIXME: make me fleible.
    var apis = [ { name: "Gallery", url: '/gallery/index'}, 
                 { name: "Upload", url: '/gallery/upload'}, 
                 { name: "SearchGallery", url: '/gallery/search'},
                 { name: "tripRecord", url: '/gallery/triprecord'} ];

    res.render('api', { apis: apis, title: 'apis' });
}


/**
 * Auto-load all route files under routes dir.
 */
var notAutoLoadFiles = ['index.js'];

function isFileToBeAutoLoad (filename) {
   return /\.js$/.test(filename) && notAutoLoadFiles.indexOf(filename) === -1;
}

function addRoutes (app, prefixInput, filename) {
  var prefix = prefixInput ? prefixInput : '',
      name = filename.substr(0, filename.lastIndexOf('.')),
      exps = require(['.', prefix, name].join('/'));

  // TODO: separate GET/POST/ALL
  objUtil.forEach(exps, function (key, value) {
     console.log([prefix, name.toLowerCase(), key.toLowerCase()].join('/'));
     app.all([prefix, name.toLowerCase(), key.toLowerCase()].join('/'), value);
  });
}
