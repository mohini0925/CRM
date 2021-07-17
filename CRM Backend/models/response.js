const mongoose = require('mongoose');

let ResponseSchema = new mongoose.Schema({
    T_id :{
        type  : String,
        required : true
    },
    Sender_email:{
        type  : String,
        required : true
    },    
    R_text:{
      type: String,
      requires: true
    },
    R_date:{
            type: Date,
            default: Date.now
    }
});

const Response = new mongoose.model('responses',ResponseSchema);
module.exports = Response