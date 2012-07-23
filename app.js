
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

routes(app);

// app.get('/', routes.tripBoard.galleryPage);
// app.get('/api', routes.api);

// app.all('/:service/:action', function(req, res, next) {
//     var _resolveMethodName = function(methodName, obj) {
//         for (var m in obj) {
//             if (methodName && methodName.toLowerCase() == m.toLowerCase()) {
//                 return m;
//             }
//         }
//         return null;
//     };

//     var serviceName = _resolveMethodName(req.params.service, routes);
//     if (serviceName) {
//         var actionName = _resolveMethodName(req.params.action, routes[serviceName]);
//         if (actionName) {
//             routes[serviceName][actionName](req, res);
//             return;
//         }
//     }

//     next();
// });

app.listen(process.env.VCAP_APP_PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
