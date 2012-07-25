var fs = require('fs');

/*
 * GET home page.
 */
var utils = require('../lib/utils'),
   objUtil = require("../lib/object-utils"),
   gallery = require('./gallery');

var apis = {};

module.exports = function (app) {

   app.get('/', gallery.index);
   app.get('/index', gallery.index);
   app.get('/api', api);

   fs.readdirSync(__dirname).filter(isFileToBeAutoLoad).forEach(addRoutes.bind({}, app, __dirname, ''));

   var serviceDir = process.cwd() + '/services';
   fs.readdirSync(serviceDir).forEach(addRoutes.bind({findAPI:true}, app, serviceDir, '/api'));

};

function index(req, res) {
   res.render('index', { title:'iTrip' });
}
;

/**
 * API Home page listing all apis
 */
function api(req, res) {
   console.log(apis);
   res.render('api', { apis:apis, title:'apis' });
}


/**
 * Auto-load all route files under routes dir.
 */
var notAutoLoadFiles = ['index.js'];

function isFileToBeAutoLoad(filename) {
   return /\.js$/.test(filename) && notAutoLoadFiles.indexOf(filename) === -1;
}

function addRoutes(app, dir, urlPrefix, filename) {
   var self = this,
      prefix = urlPrefix || '',
      name = filename.substr(0, filename.lastIndexOf('.')),
      exps = require([dir, name].join('/'));

   // TODO: separate GET/POST/ALL
   objUtil.forEach(exps, function (key, value) {
      console.log([prefix, name.toLowerCase(), key.toLowerCase()].join('/'));
      if (!self.findAPI || (self.findAPI && utils.isFunction(value))) {
         var url = [prefix, name.toLowerCase(), key.toLowerCase()].join('/');
         app.all(url, value);

         if (self.findAPI) {
            apis[name] = apis[name] || {};
            apis[name][key] = url;
         }
      }
   });
}
