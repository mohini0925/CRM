const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name :{
        type  : String,
        required : true
    } ,
    email :{
      type  : String,
      required : true,
    } ,
    password :{
      type  : String,
      required : true
    } ,
    phone: Number,
    date:{
        type: Date,
        default: Date.now
    }
});

const User = new mongoose.model('users',userSchema);
module.exports = User