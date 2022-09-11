var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
let MongoStore = require('connect-mongo');
const passport = require('passport')
var app = express();
const flash = require('connect-flash')

// route setup

var signUpRoute = require('./routes/signUp');
var signInRoute = require('./routes/signIn');
const logOutRoute = require('./routes/logOut');



// db  connection

mongoose.connect(
  process.env.mongoUrl,
  {useNewUrlParser:true, useUnifiedTopology:true  },

).then(()=>{})
 .catch(error => console.log(error))

mongoose.Promise = global.Promise;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.urlencoded({ extended: false }));


app.use(cookieParser('secret'));

app.use(session({
  secret: '7861',
  resave: false,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: true,
    maxAge: 3000000 *60
  },
  store: MongoStore.create({
    mongooseConnection: mongoose.connection,
    mongoUrl: process.env.mongoUrl, 
    collection: 'session',
    ttl: 28800 
  }),
}));

app.use(passport.session())
app.use(flash())
require('./auth/passportAuthentication')(passport)






app.get('/', (req, res) => {
  res.send('asdasd')
})


app.use(logger('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(signUpRoute);
app.use(signInRoute);
app.use(logOutRoute);






// mongodb session 




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// Db connection

// error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

module.exports = app;
