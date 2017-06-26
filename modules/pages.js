var does = require('./tasks'),
    task = require('../models/task'),
    User = require('../models/user')

var page= {
    index: function(req, res){
        res.render('index', {title: 'wow'/*, user: req.session.cookie.user.name*/})
    },
    login: function(req, res){
        res.render('login')
    },
    signup: function(req, res){
        res.render('signup')
    },
    doSignup: function(req, res){
        var newUser = new User({name: req.body.username, pass: req.body.password})
        if (!req.body.username){
            res.render('signup', {say: 'Придумай погоняло!'})
        }else{
            does.newUser(newUser, function(err){
                res.redirect('/')
            })
        }
    },
    list: function(req, res){
        does.getList(task, function(err, list){
            res.render('show', {title: 'Вот список', list: list})
        })
    },
    add: function(req, res){
        res.render('add', {title: 'Добавить'})
    },
    doAdd: function(req, res){
        var toSave = new task({title: req.body.title, text: req.body.text})
        //Проверка на пустой title
        if (!req.body.title){
            res.render('add', {title: 'Ошибка! Укажите название!', itemText: req.body.text})
        }else{
            does.add(toSave, function(err){
                res.render('add', {title: 'Сделано. Добавить ещё?'})
            })
        }
    },
    edit: function(req, res){
        does.findOne(task, req.query.id, function(err, item){
            res.render('edit', {
                itemId: item._id,
                title: 'Редактируем '+item.title,
                itemTitle: item.title,
                itemText: item.text,
                itemUser: item.creatorId
            })
        })
    },
    remove: function(req, res){
        does.findOne(task, req.query.id, function(err, item){
            res.render('remove', {title: item.title, itemId: item._id})
        })
    },
    doRemove: function(req, res){
        does.delete(task, req.query.id, function(err){
            does.getList(task, function(err, list){
                res.render('show', {title: 'Запись удалена. Вот список', list: list})
            })
        })
    },
    doEdit: function(req, res){
        var toChange = new task({title: req.body.title, text: req.body.text})
        does.update(task, req.query.id, toChange, function(err, item){
            does.getList(task, function(err, list){
                res.render('show', {title: item.title + ' сохранён. Вот список', list: list})
            })
        })
    }
}
module.exports= page