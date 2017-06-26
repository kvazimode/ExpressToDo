var options = {
    //Добавить пользователя
    newUser: function(user, callback){
        user.save(callback)
        console.log('>> У нас новенький! ' + user.name)
    },
    //получение списка записей из БД
    getList: function(model, callback){
        model.find({}, 'title text', callback)
        console.log('>> Отображён список')
    },
    //добавление записи в БД
    add: function(task, callback){
        task.save(callback)
        console.log('>> Схоронил '+task.title)
    },
    //найти запись по id
    findOne: function(model, id, callback){
        model.findOne({_id: id}, callback)
        console.log('>> Найдено: '+ id)
    },
    //обновление записи по id информацией из task
    update: function(model, toChange, task, callback){
        model.findOneAndUpdate({_id: toChange}, {$set: {title: task.title, text: task.text}}, {new: true}, callback)
        console.log('>> '+task.title+' изменено')
    },
    //удаление по id
    delete: function(model, id, callback){
        model.findOneAndRemove({_id: id}, callback)
        console.log('>> '+ id +' удалено')
    }
}

module.exports = options