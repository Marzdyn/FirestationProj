const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CallSchema = new Schema ({

    call: {
        type: String,
        required: true,
    },
    location: {
        required: true,
        type: String
    },
    response: {
        type: Schema.Types.ObjectId,
        ref: "truck"
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    },
    notes: {
        type: String
    }
})




module.exports = mongoose.model("Call", CallSchema)