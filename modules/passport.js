var LocalStrategy = require('passport-local').Strategy,
    User = require ('../models/user'),
    flash = require ('connect-flash'),
    mongoose = require('mongoose')

module.exports = function(passp){
        passp.serializeUser(function(user, done){
        done(null, user._id)
    })
    passp.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user)
        })
    })
    passp.use('local-signup', new LocalStrategy({
        usernameField: 'name',
        passwordField: 'pass',
        passReqToCallback: true
    },
    function(req, name, pass, done){
        process.nextTick(function(){
            User.findOne({'name': name}, function(err, user){
                if (err)
                    console.log('ошипк')
                    return done(err)
                if (user){
                    console.log('такие есть')
                    return done(null, false, req.flash('signupMessage', 'Придумай другое погоняло'))
                }else{
                    console.log('сохраняем..')
                    var newUser = new User()
                    newUser.name = name
                    newUser.pass = newUser.generateHash(pass)
                    newUser.save(function(err){
                        if (err)
                            throw err
                        return done(null, newUser)
                    })
                }
            })
        })
    }))
    passp.use('local-login', new LocalStrategy({
        usernameField: 'name',
        passwordField: 'pass',
        passReqToCallback: true
    },
    function(req, name, pass, done){
        User.findOne({'name': name}, function(err, user){
            if (err)
                console.log('ошипк')
                return done(err)
            if (!user)
                console.log('нет таких')
                return done(null, false, req.flash('loginMessage', 'Таких не знаю'))
            if (!user.validPassword(pass))
                console.log('пароль')
                return done(null, false, req.flash('loginMessage', 'Чёто попутал'))
            console.log('кто-то пришел')
            return done(null, user)
        })
    }))
}