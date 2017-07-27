const mongoose = require('mongoose');

const mongoConfig = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_DBURL);
  mongoose.connection
    .once('open', () => {
      console.log('mongoose is running')
      // drop database
      // mongoose.connection.db.dropDatabase(function(err){}) 
    })
    .on('error', err => console.error('error running mongoose ', err))
};

module.exports = mongoConfig;



