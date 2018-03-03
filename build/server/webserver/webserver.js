'use strict';

var log = require ('../logger.js')('webserver').getLogger ();
log.info ('Starting Webserver');

var express = require ('express');
var http = require ('http');
var bodyParser = require ('body-parser');
var bunyanRequestLogger = require ('bunyan-request-logger');
var path = require ('path');
var error = require ('./error.js');

var app = express ();
app.use (bodyParser.json ());

app.use (bunyanRequestLogger().requestLogger ());

app.use ('/ui/', express.static (path.join (__dirname,'../../ui')));

app.use (function (req, res)
{
	error.sendError (res, error.notFound ());
});

app.use (bunyanRequestLogger().errorLogger ());

app.use (function (err, req, res, /*next*/)
{
	if (err.name === 'UnauthorizedError') 
	{
		error.sendError (res, error.unauthorised ());
	}
	else
	{
		log.error ('Server error', {requestId: req.requestId});
		error.sendError (res, error.serverError ());
	}
});

var port = 3000;

function serverListener (err)
{
	if (err)
	{
		log.fatal ('Error listening to port ' + port, err);
		console.log('Error listening to port ' + port, err);
	}
	else
	{
		log.info ('Webserver started listening on port ' + port);
		console.log('Webserver started listening on port ' + port);
	}
}

log.info ('Starting sever with http');
var server = http.createServer(app);
server.listen (3000, serverListener);

