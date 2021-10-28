const User = require('../models/users')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    user = await User.create({...req.body})
    //UserSchema.pre middleware is used encrypting the password
    res.status(StatusCodes.CREATED).json(user)
}

const login = (req, res) => {
    res.send()
}

module.exports = {
    login,
    register
}