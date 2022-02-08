if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require("express-session")
const initPassport = require('../config/passport-config')

const users = []

initPassport(passport, 
  email => users.find(user => user.email === email), 
  id => users.find(user => user.id === id)
)

const indexRouter = require('./routes/index');

const errorHandler = require('./middleware/errorHandler');

const app = express();

const auth = require("./routes/auth/index")

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

app.use('/', indexRouter);

app.use('/successLogin', (req,res)=>{
  res.send("Login success")
})

app.use('/failedLogin', (req,res)=>{
  res.send("Login failed")
})
app.post('/login', passport.authenticate('local', {
  successRedirect:'/successLogin',
  failureRedirect: '/failedLogin',
  failureFlash: true
}))

app.post('/signup', async (req,res)=>{
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    console.log(users)
    res.send('Signed up for new account')
  } catch(err){
    res.send(`Server error: ${err}`)
  }
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

module.exports = app;
