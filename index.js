const express  = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const pinRoute = require('./routes/pins');

dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Hospital", {useNewUrlParser:true},{useUnifiedTopology:true}).then(
    () => {
        console.log("MongoDB connection successful");
        const db = mongoose.connection;
        db.once("open", () => {
            console.log("MongoDB database connection established successfully");
            db.pins.createIndex({ loc: "2dsphere" });
        });
    }
).catch((err) => console.log(err));


app.use('/api/pins', pinRoute);

app.listen(8800, ()=>{
    console.log('Backend running and server up and running at 8800!');
})