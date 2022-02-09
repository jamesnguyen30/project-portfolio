const express = require('express');
const bcrypt = require('bcrypt')
const passport = require('passport')
const initPassport = require('../../config/passport-config')
const checkIfAuthenticated = require('../../middleware/checkIfAuthenticated')

const router = express.Router();
const generateUsers = require("../../data/dummyUser")

let users = []

generateUsers().then(data => {
    users = data 
})

initPassport(passport, 
  email => users.find(user => user.email === email), 
  id => users.find(user => user.id === id)
)

router.get('/login', (req,res)=>{
    res.send("login page")
})

router.get('/signup', (req,res)=>{
    res.send("signup page")
})

router.get('/checkLogin', checkIfAuthenticated, (req,res)=>{
    console.log(users)
    return res.send(`User is login ${req.user.id}`)
});

router.get('/successLogin', (req,res)=>{
  return res.send("Login success")
})

router.get('/failedLogin', (req,res)=>{
    return res.send("Login failed")
})

router.post('/login', passport.authenticate('local', {
  successRedirect:'/auth/successLogin',
  failureRedirect: '/auth/failedLogin',
  failureFlash: true
}))

router.post('/signup', async (req,res)=>{
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

module.exports = router