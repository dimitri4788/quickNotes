//Some useful definitions
portNumber = 5002

//Create an Express application object and load serve-favicon module
var express = require('express');
var favicon = require('serve-favicon');
var app = express();

//Set the port value
//  Heroku dynamically assigns your app a port, so you can't set the port to a fixed number
//  Heroku adds the port to the env, so you can pull it from there, that way it will
//  still listen to port 5000 when you test locally, but it will also work on Heroku
app.set('port', (process.env.PORT || portNumber));

//Serve static content for the app from the "static" directory in the application directory
app.use(express.static(__dirname + '/static'));
app.use(favicon(__dirname + '/static/images/favicon.ico'));

//Set the directory for all template files
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

//Route HTTP GET requests to a callback function and render index page
app.get('/', function(request, response) {
    response.render('index');
});
app.get('/info', function(request, response) {
    response.render('info');
});

//Bind and listen for connections on the specified host and port
app.listen(app.get('port'), function() {
    console.log('Node.js and Express.js app is running on port', app.get('port'));
});
