const User = require('../models/users')

const createUser = async (req, res, next) => {
  try {

    const { firstName, lastName, username, email, password } = req.body

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    })
   
    const createdUser = await newUser.save()

    return res.status(201).json({
      status: true,
      data: createdUser,
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  createUser,
}