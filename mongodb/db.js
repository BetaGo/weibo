const mongoose = require('mongoose');
const mongoSecret = require('../secret/mongo');

mongoose.connect(mongoSecret.mongodb);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(`连接出错: ${error}`);
});

db.once('open', () => {
  console.log('连接数据库成功～');
});

db.once('close', () => {
  console.log('断开与数据库的链接');
});

module.exports = db;
