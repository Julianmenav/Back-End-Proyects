const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please, provide a name"],
        minlength:3,
        maxlength:20
    },
    email: {
        type: String,
        required: [true, "Please, provide a email"],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please, provide valid email']
    },
    password: {
        type: String,
        required: [true, "Please, provide a password"],
        minlength:3
    },
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = () => {
    return jwt.sign({UserId: this._id, name: this.name}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function (passwordProvided) {
    const isMatch = await bcrypt.compare(passwordProvided, this.password)
    return isMatch    
}

module.exports = mongoose.model('User', UserSchema)