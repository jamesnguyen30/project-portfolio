if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

// const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require("express-session")
// const initPassport = require('./config/passport-config')

const checkIfAuthenticated = require('./middleware/checkIfAuthenticated')

const errorHandler = require('./middleware/errorHandler');

const app = express();

const authRouter = require("./routes/auth/index")

app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(flash())
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", authRouter)
app.get('/healthCheck', (req,res)=>{
  res.send("API is healhty. Keep it up")
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

module.exports = app;
