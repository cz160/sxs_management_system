//数据库连接工具
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sxs', { useNewUrlParser: true });

var db=mongoose.connection;

db.on('error',console.error.bind(console, 'connection error:'))


db.once('open', function() {
    // we're connected!
  });

  
module.exports = mongoose