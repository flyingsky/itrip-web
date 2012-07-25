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
};

/**
 * API Home page listing all apis
 */
function api(req, res) {
//   console.log(apis);
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
      targetModule = require([dir, name].join('/'));

   // TODO: separate GET/POST/ALL
   objUtil.forEach(targetModule, function (key, value) {
      console.log([prefix, name.toLowerCase(), key.toLowerCase()].join('/'));
      if (!self.findAPI || (self.findAPI && utils.isFunction(value))) {
         var url = [prefix, name.toLowerCase(), key.toLowerCase()].join('/');
         if (!self.findAPI) {
            app.all(url, value);
            return;
         }

         //handle service api
         apis[name] = apis[name] || {};
         apis[name][key] = url;

         //parse function signature to extracts parameter from request automatically
         app.all(url, function(req, res){
            var callback = function(err, result){
               if (err) {
                  res.send(err);
               } else {
                  res.send(result);
               }
            };

            var args = [];

            //parse signature
            var fnStr = value.toString();
            var paraStartIndex = fnStr.indexOf('(') + 1;
            var paramEndIndex = fnStr.indexOf(')');
            var paraStr = fnStr.substr(paraStartIndex, paramEndIndex - paraStartIndex);
            var paras = paraStr.split(',');

            //function is not async
            var isAsync = paras.length > 0 && paras[0].trim() == 'callback';
            var i = 0;
            if (isAsync) {
               args.push(callback);
               i = 1;
            }

            //TODO: handle specical case for req.files for file upload
            for(; i < paras.length; i++) {
               args.push(req.param(paras[i].trim()));
            }

            //TODO: how to handle this in value???
            var result = value.apply({}, args);

            if (!isAsync) {
                callback(null, result);
            }
         });
      }
   });
}
