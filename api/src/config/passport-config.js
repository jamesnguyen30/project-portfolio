const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const  init = (passport, getUserByEmail, getUserById) => {
    passport.use(new LocalStrategy({usernameField: 'email'}, 
    async (email, password, done)=>{
        console.log(`user entered email: ${email} - password: ${password}`)
        const user = getUserByEmail(email)
        if(user == null){
            return done(null, false, {message: 'Wrong credentials'})
        }

        try{
            if( await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
            return done(null, false, {message: 'Wrong credentials'})

        } catch (err) {
            return done(err)
        }
    }))

    passport.serializeUser((user,done)=>{done(null, user.id)})
    passport.deserializeUser((id,done)=>{done(null, getUserById(id))})
}

module.exports = init
