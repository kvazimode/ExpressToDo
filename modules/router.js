var page = require('./pages'),
    express= require('express')

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        console.log('проверка')
        return next()
    }else{
        res.redirect('/login')
    }
}

module.exports= (function(){
    'use strict'
    var router = express.Router()
    //pages
    router.get('/', page.index)

    //лохин
    router.get('/login', page.login)
//    app.post('/login', pass.authenticate('local-login', {
//        successRedirect: '/',
//        failureRedirect: '/login',
//        failureFlash: true
//    }))

    //новый член
    router.get('/sign', page.sign)
//    app.post('/sign', pass.authenticate('local-signup', {
//        successRedirect: '/',
//        failureRedirect: '/sign',
//        failureFlash: true
//    }))
    //Отображение списка
    router.get('/show', isLoggedIn, page.list)

    //Отображение страницы добавления записи
    router.get('/add', isLoggedIn, page.add)

    //После нажатия кнопки "добавить"
    router.post('/add', isLoggedIn, page.doAdd)

    //Отображение страницы редактирования
    router.get('/edit', isLoggedIn, page.edit)

    //Отображение страницы подтверждения удаления
    router.get('/remove', isLoggedIn, page.remove)

    //Удаление и отображение списка 
    router.get('/removed', isLoggedIn, page.doRemove)

    //После нажатия кнопки "внести изменения"
    router.post('/edit', isLoggedIn, page.doEdit)
    
    return router
})()