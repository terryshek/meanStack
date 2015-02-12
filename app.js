var express = require('express');
//=======vhost
var vhost = require('vhost');

//===for validation===//
var session = require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
//===for validation===//
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

// Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/memberAccount', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

require('./config/passport')(passport); // pass passport for configuration

// router required
//var routes = require('./routes/index');
//var users = require('./routes/users');
//var member = require('./routes/account');

/* ==========================================================
 External Modules/Packages Required
 ============================================================ */
var busboy = require('connect-busboy');		//middleware for form/file upload
//var im = require('imagemagick');
//var easyimg = require('easyimage');			//image processing
var path = require('path');					//used for file path
var fs = require('fs-extra');				//File System - for file manipulation
var util = require('util');					//for stream
//===========================================================//

var app = express();


//vhost

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//authentication
// required for passport
app.use(session({ secret: 'terryshekWebsite' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(cors()); // cross domain
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/* ==========================================================
 Use busboy middleware
 ============================================================ */
app.use(busboy());
// ===============routing====================//
//app.use('/', routes);
//app.use('/users', member);
// routes ======================================================================
require('./routes/index')(app, passport); // load our routes and pass in our app and fully configured passport

app.use(vhost('shinychang.net', require('./b.js')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("a");
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
