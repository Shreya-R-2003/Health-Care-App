const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
    hospname:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:false
    },
    rating:{
        type:Number,
        require:true
    },
    lat:{ 
        type:Number,
        require:true
    },
    long:{
        type:Number,
        reqiure:true,
    }
    
})

module.exports = mongoose.model("Pin", PinSchema);