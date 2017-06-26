var mongoose = require ('mongoose')

var UserS = new mongoose.Schema({
    name: String,
    pass: String,
    id: {type: Number, default: 0},
    role: {type: Number, default: 1}
})

var User = mongoose.model('User', UserS)

module.exports = User