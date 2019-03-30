var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var JWTstrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt
var UserModel = require('../models/user')


// Login de Utilizador
passport.use('login',new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
},async (u,p,done) =>{
    try{
        user = await UserModel.findOne({_id: u})
        if(!user){
            return done(null,false,{message: 'Utilizador não encontrado!'})
        }
        var valida = await user.isValidPassword(p)
        if(!valida) return done(null,false,{message: 'Password inválida!'})

        return done(null,user,{message: 'Utilizador autenticado!'})
    }
    catch(erro){
        done(erro)
    }
}))


// Verificação do Token
var extractFromSession = (req) => {
    var token = null
    if(req && req.session) token = req.session.token
    if(!token && req.headers.authorization) token = req.headers.authorization
    return token
}

passport.use('isUser',new JWTstrategy({
    secretOrKey: "vr2019",
    jwtFromRequest: ExtractJWT.fromExtractors([extractFromSession]),
    passReqToCallback: true
},async(req,token,done)=>{
    try {
            return done(null,token.user)
    } catch (error) {
        return done(erro)
    }
}))