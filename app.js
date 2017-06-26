var express = require('express'),
    app = express(),
    pug = require('pug'),
    con = require ('./modules/conn'),
    mongoose = require('mongoose'),
    bp = require('body-parser'),
    page = require('./modules/pages'),
    conf = require('./config'),
    pass = require('passport'),
    cookie = require('cookie-parser'),
    session = require('express-session'),
    Strategy = require('passport-local').Strategy,
    User = require('./models/user')

//проверка подключения к БД
con.db.once('open', function(){
    console.log('>> connected!')
})

app.set('views', './views')
app.set('view engine', 'pug')
app.use(bp())
app.use(cookie())

//for passport
app.use(session({secret: 'keykey'}))
app.use(pass.initialize())
app.use(pass.session())
pass.use(new Strategy(
  function(username, password, done) {
    User.findOne({name: username}, function(err, user) {
      if (err) { return done(err) }
      if (!user) { return done(null, false) }
      if (user.pass != password) { return done(null, false) }
      return done(null, user)
    })
  }))
pass.serializeUser(function(user, done) {
    console.log(user._id)
  done(null, user._id)
})

pass.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    if (err) { return done(err) }
    done(null, user)
  })
})


app.get('/', page.index)

//вход
app.get('/login', page.login)
app.post('/login', pass.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

//новый юзверь
app.get('/signup', page.signup)
app.post('/signup', page.doSignup)

//Отображение списка
app.get('/show',
        require('connect-ensure-login').ensureLoggedIn(),
        page.list)

//Отображение страницы добавления записи
app.get('/add', page.add)

//После нажатия кнопки "добавить"
app.post('/add', page.doAdd)

//Отображение страницы редактирования
app.get('/edit', page.edit)

//После нажатия кнопки "внести изменения"
app.post('/edit', page.doEdit)

//Отображение страницы подтверждения удаления
app.get('/remove', page.remove)

//Удаление и отображение списка 
app.get('/removed', page.doRemove)

app.listen(conf.port, function(){
    console.log('>> working on ' + conf.port)
})