const mongoose = require('mongoose');

let AgentSchema = new mongoose.Schema({
    Aname :{
        type  : String,
        required : true
    },

    email:{
      type: String
    },
    password:{
        type: String
    },
    T_pending:{
            type: Number,
            
    },
    T_completed:{
        type: Number,
        
}
});

const Agent = new mongoose.model('agents',AgentSchema);
module.exports = Agent