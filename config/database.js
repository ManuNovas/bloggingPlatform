const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: true,
  maxPoolSize: 10,
  socketTimeoutMS: 45000,
  family: 4,
}

require('dotenv').config();

const connectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URI;
    mongoose.connect(connectionString, options).then(() => {
      console.log('MongoDB connected');
    }).catch(error => {
      console.log('MongoDB connection error: ', error);
    });
    mongoose.connection.on('error', error => {
      console.log('MongoDB connection error: ', error);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  try {
    mongoose.connection.close().then(() => {
      console.log('MongoDB disconnected through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.log('MongoDB close connection error: ', error);
    process.exit(1);
  }
});

module.exports = connectDB;
