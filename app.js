var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var character = require('./models/characters');
var weapon = require('./models/weapons');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const characters = require("./routes/characters");
const weapons = require("./routes/weapons");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/characters',characters.addCharacter);
app.get('/characters', characters.findAll);
app.get('/characters/votes', characters.findTotalVotes);
app.get('/characters/:id', characters.findOne);
app.delete('/characters/:id', characters.deleteCharacter);
app.put('/characters/:id/vote', characters.incrementUpvotes);

app.post('/weapons',weapons.addWeapon);
app.get('/weapons', weapons.findAllWeapons);
app.get('/weapons/:id', weapons.findOneWeapon);
app.delete('/weapons/:id', weapons.deleteWeapon);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
