//check username, passw in post login request
//if exist create new JWT
//send back to frontedn

//setup auth so only the request with jwt can access the dashboard
const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors')


const login = async (req, res) => {
  const {username, password} = req.body
  if(!username || !password){
    throw new BadRequestError('Please provide email and password')
  }  
  let id = new Date().getDate()
  //just for demo, in production it must be long, complex and unguessable string value(jwtSecret)
  const token = jwt.sign({id, username}, process.env.JWT_SECRET)

  res.status(200).json({msg:'User created', token})
}

const dashboard = async (req,res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });

}

module.exports= {
  login, dashboard
}