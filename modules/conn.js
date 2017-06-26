var mongoose = require('mongoose'),
    conf = require('../config')

mongoose.connect(conf.dbUrl)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

module.exports = db