const mongoose = require('mongoose');
// const db = 'mongodb://127.0.0.1:27017/siren_db';
const db = 'mongodb+srv://brunokristo:HI7dEamVUCUIf4sw@cluster0.sgjetkr.mongodb.net/siren_cloud_db';

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
