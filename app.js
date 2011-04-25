
/**
 * Module dependencies.
 */

var express = require('express'), 
    everyauth = require('everyauth'), 
    app = express.createServer();
everyauth.helpExpress(app);

var mongoose = require('mongoose').Mongoose;
var _ = require('underscore')._;
var app = module.exports = express.createServer();

// Configuration
everyauth.facebook
  .myHostname('http://cheapcoffee.panosjee.c9.io')
  .appId('26219543388')
  .appSecret('e81f33d042406ccdf144a243d9ad1c25')
  .scope('email')
  .findOrCreateUser( function (session, accessToken, fbUserMetadata) {
    // find or create user logic goes here
    console.log("=================== CONSOLE");
  })
  .redirectPath('/');
  
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'slkjfh8u8uiojklsadjflkjiu243rkljdslkfjcheadskjfpjbajdfcof343feendf' }));
  app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
  app.use(everyauth.middleware());
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

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});



// Only listen on $ node app.js

if (!module.parent) {
  app.listen(process.env.C9_PORT);
  console.log("Express server listening on port %d", app.address().port);
}
