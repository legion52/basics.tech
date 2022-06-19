const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  birthDate: String,
  gender: String,
  img: String,

})


const userModel = mongoose.model('Users', userSchema)

module.exports = userModel
