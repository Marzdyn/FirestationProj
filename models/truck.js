const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TruckSchema = new Schema ({

    unitNumber: {
        type: String,
        required: true
    },
    type: {
        required: true,
        type: String,
        enum: ['engine', 'aerial', 'brush', 'tanker', 'srt', 'chief'],
        default: 'engine'
    }

})




module.exports = mongoose.model("Truck", TruckSchema)