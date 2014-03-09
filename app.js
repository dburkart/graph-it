var express = require('express')
  , plot = require('plot.js')
  , path = require('path')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 9000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  //app.use(express.session({ secret: 'tobo!', store: store }));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.locals.pretty = true;
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
	res.render('index', {
		title: 'Graph-It'
	});
});

app.post('/plot', function(req, res) {
	var graph = new plot();
	var result = graph.render(req.body.input);

	res.render('plot', {
		graph: result
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});