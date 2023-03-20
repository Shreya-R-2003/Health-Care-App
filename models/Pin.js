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
        
    },
    pin:{
        type:String,
    }

}
}
)

PinSchema.index({"loc":"2dsphere"})
module.exports = mongoose.model("Pin", PinSchema);
