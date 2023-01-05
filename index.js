const express  = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pinRoute = require('./routes/pins');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true},{useUnifiedTopology:true}).then(
    () => {
        console.log("MongoDB connection successful");
    }
).catch((err) => console.log(err));

app.use('/api/pins', pinRoute);

app.listen(8800, ()=>{
    console.log('Backend running and server up and running at 8800!');
})