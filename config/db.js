const mongoose = require('mongoose');
const config = require('config');
const db = "mongodb+srv://123hiba:123hiba@watchandlistencluster.ldcaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(db);

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;