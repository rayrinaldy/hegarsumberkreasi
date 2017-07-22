var path         = require('path'),
	express      = require('express'),
	mongoose     = require('mongoose'),
	session      = require('express-session'),
	bodyParser   = require('body-parser'),
	cookieParser = require('cookie-parser'),
	multer       = require('multer'),
	passport     = require('passport'),
	flash        = require('connect-flash'),
	morgan       = require('morgan'),
	csrf         = require('csurf'),

	config       = require('./config/config'),
	routes       = require('./app/routes.js')(passport),

	upload       = multer(),
	app          = express(),
	// port         = process.env.PORT || 3001;
	port         = 3001;

// ============= EXPRESS VIEW CONFIG =================
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'/views/pug'));
app.use(express.static('public'));
app.disable('etag');

if (app.get('env') === 'development') {
    app.locals.pretty = config.pretty;
}

//================= DATABASE CONNECTION =====================

mongoose.connect('mongodb://localhost/hegarsumberkreasi', function(err){
	if(err){
		console.log('\x1b[36m%s\x1b[0m','Cannot connect to the database');
	} else{
		console.log('\x1b[31m','Connected to database at port','\x1b[32m','27017');
		// console.log('\x1b[32m','27017');
	}
});

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser()); // read cookies (needed for auth)
app.use(csrf({ cookie: true }));
// app.use(upload.array());
app.use(function(req, res, next) {
  res.locals._csrf = req.csrfToken();
  next();
});

// sessions setting - required for passport
app.use(session({
  secret: 'rayresto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } //secure: true is a recommended option. However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// require('./app/routes.js')(app, passport);
app.use('/', routes);

var initPassport = require('./config/passport');
initPassport(passport);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    // next(err);
    if (req.xhr) {
        console.log(err);
        res.send(err);
    } else {
        console.log(err);
        // res.send(err);
        res.status(err.status || 500);
        res.render('404', {
            message: err.message,
            error: err
        });
    }
});

app.listen(port, function(){
	console.log('Connected to port ' + port);
});

