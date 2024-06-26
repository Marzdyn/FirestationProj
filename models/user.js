const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const UserSchema = new Schema ({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    memberSince: {
        type: Date,
        default: Date.now
      }
})

UserSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return next(err)
        user.password = hash
        next()
    })
})

UserSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

UserSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", UserSchema)