const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: value => {
            if(!validator.isEmail(value)){
                throw new Error({error : "Invalid email !"})
            }
        }
    },
    phone: {
        type: String, 
        required: true,
    },
    password: {
        type: String,
        minlength: 4
    },
    role: {
        type: String,
        default: "user"
    },
    token: {
        type: String,
        required: true
    }
})

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

module.exports = mongoose.model('User', userSchema)