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
   },
   isDeleted : {
      type : Boolean,
      default : 0
   }
},{timestamps:true})
userSchema.index({name:'text',email:'text'})
const user = mongoose.model('UserModel',userSchema)
module.exports = user