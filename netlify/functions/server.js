const express = require('express');
const path = require('path');
const serverless = require("serverless-http");
const mongoose = require('mongoose');

const app = express();
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

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('../../routes/users'));
app.use('/api/auth', require('../../routes/auth'));
app.use('/api/video', require('../../routes/video'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || '5000';
const host = '0.0.0.0';
app.listen(PORT, host, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
module.exports.handler = serverless(app);