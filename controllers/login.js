const router = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.route('/').post(async (req, res, next) => {

  try {

    const isExisting = await User.findOne({email: req.body.email})

    if(isExisting){
      throw new Error("An account already exists with this email. Try a new mail")
    }
    
    const user_name = await User.findOne({username: req.body.email})
    if(user_name){
      throw new Error("An account already exists with this username. Try a new username")
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = await User.create({...req.body, password: hashedPassword})

    const {password, ...others} = newUser._doc

    //token
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'})

    return res.status(201).json({user: others, token})
  } catch (error) {
    res.status(500).json(error.message)
  }

})

router.rooute('/login').post(async(req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if(!user){
      throw new Error('Username is incorrect')
    }


    const comparePass = await bcrypt.compare(req.body.password, user.password)
    if(!comparePass){
      throw new Error('Password is incorrect')
    }

    const {password, ...others} = user._doc

    //token
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'} )

    return res.status(201).json({user: others, token})
  } catch (error) {
    res.status(401).json(error.message)
  }
})

module.exports = router