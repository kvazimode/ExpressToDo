var mongoose = require ('mongoose')

var TaskS = new mongoose.Schema({
    title: String,
    text: String,
    creatorId: {type: Number, default: 0}
})

var Task = mongoose.model('Task', TaskS)

module.exports = Task