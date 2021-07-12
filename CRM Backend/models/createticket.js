const mongoose = require('mongoose');

let TicketSchema = new mongoose.Schema({
    T_name :{
        type  : String,
        required : true
    },
    T_type:{
        type  : String,
        required : true
    },

    T_desc: {
        type : String
    }, 
    T_status :{
        type  : String,
        required : true
    } ,      
    Agent_id:{
        type : String,
    },
    
    T_email:{
      type: String
    },
    T_date:{
            type: Date,
            default: Date.now
    }
});

const Ticket = new mongoose.model('tickets',TicketSchema);
module.exports = Ticket