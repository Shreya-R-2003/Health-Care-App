const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true
    },
    area:{
        type:String,
        require:false
    },
    // lat:{
    //     type:Number,
    //     require:true
    // },
    // long:{ 
    //     type:Number,
    //     require:true
    // },
    loc: {
        type: {
          type: String,
          enum: ["Point"]
        },
        coordinates: {
          type: [Number]
        },
    bedcap:{
        type:String,
        reqiure:true,
    },
    pin:{
        type:String,
        reqiure:true,
    }
    
}
}
)


module.exports = mongoose.model("Pin", PinSchema);