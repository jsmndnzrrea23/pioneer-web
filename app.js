/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var fileUpload = require('express-fileupload');

//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
         
            });
 
const server_port = process.env.PORT || this.SERVER_PORT || 2501;
const env = process.env.NODE_ENV || 'development';

connection.connect();
 
global.db = connection;
 
// all environments

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// default options
app.use(fileUpload());

app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie : {
                maxAge : 1000
              }
            }));
 
// development only
app.get('/', routes.index);//call for main index page
app.get('/test', user.test);
app.post('/test', user.test);
app.get('/safetrip_req', user.safetrip_req);
app.post('/safetrip_req', user.safetrip_req);
app.get('/submit_photos', user.submit_photos);
app.post('/submit_photos', user.submit_photos);
app.get('/promo', user.promo);
app.post('/promo', user.promo);
app.get('/quotation', user.quotation);
app.post('/quotation', user.quotation);
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile
//Middleware
app.listen(server_port, function() {
  console.log('Server started on port ' + server_port + ".");
});
