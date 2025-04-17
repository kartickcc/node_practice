const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name : {
    required:true,
    type:String,
    trim : true
   },
   email : {
    type:String,
    require: true,
    trim : true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
   }
})

const user = mongoose.model('UserModel',userSchema)
module.exports = user