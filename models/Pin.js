const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
    name:{
        type:String,
        
    },
    rating:{
        type:String,
        
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
PinSchema.index({ loc: '2dsphere' });

module.exports = mongoose.model("Pin", PinSchema);