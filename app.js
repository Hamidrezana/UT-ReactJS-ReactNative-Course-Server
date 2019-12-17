var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blogs')
var authRouter = require('./routes/auth')
var cors = require('cors')
var passport = require('passport')
const Errors = require('./utils/Errors')
require('./configs/passport')(passport);

function passportCallback(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
        if (err) return res.send(err)
        if (!user) return res.status(401).json({success: false, message: Errors.unAuthorized})
        req.user = user
        next()
    })(req, res, next)
}
var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/user', passportCallback, usersRouter);
app.use('/blog', passportCallback, blogRouter);

module.exports = app;
