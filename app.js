
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

app.get('/', routes.index);

app.all('/trip[B|b]oard/:action', function(req, res) {
    var _resolveMethodName = function(methodName, obj) {
        for (var m in obj) {
            if (methodName && methodName.toLowerCase() == m.toLowerCase()) {
                return m;
            }
        }
        return null;
    };

    var serviceName = _resolveMethodName('tripboard', routes);
    console.log(serviceName);

    if (serviceName) {
        var actionName = _resolveMethodName(req.params.action, routes[serviceName]);
        console.log(actionName);
        if (actionName) {
            routes[serviceName][actionName](req, res);
            return;
        }
    }

//    throw new Error('Cannot find target page: ' + service + ', ' + action);
});

app.listen(process.env.VCAP_APP_PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
