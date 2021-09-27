const express = require('express');
const connectDB =  require('./config/db');
connectDB();
const app = express();

app.use(express.json({ extended: false }));

app.get('/',(req,res)=>res.json({msg:'Welcome to the Contact Keeper API'}));

//defining our routes

app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
});