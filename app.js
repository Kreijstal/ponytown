/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
//const lusca = require('lusca');
const dotenv = require('dotenv');
//const MongoStore = require('connect-mongo')(session);
//const flash = require('express-flash');
const path = require('path');
//const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const sass = require('node-sass-middleware');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads') });
const WebSocketServer = require("ws").Server
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: 'env' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const wsController = require('./controllers/websocket');
const contactController = require('./controllers/contact');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.7
 */
const app = express();

/**
 * Connect to MongoDB.
 */
 //MONGO IS NOT EVEN OPENIN, CANCEL!
//mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
/*mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
*/
/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
/*app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));*/
app.use(passport.initialize());
app.use(passport.session());
//app.use(flash());
//app.use((req, res, next) => {
//  lusca.csrf()(req, res, next);
//});
//app.use(lusca.xframe('SAMEORIGIN'));
//app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/character', homeController.index);
app.get('/about', homeController.index);

/**
 * Error Handler.0
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
var server = app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
var wss = new WebSocketServer({server: server, path: '/websocket'})
//console.log("this was executed")
wsController.init(wss);
wss.on("connection", wsController.connection);

module.exports = app;
