Customer Table
name :{
    type  : String,
    required : true
} ,
email :{
  type  : String,
  required : true
} ,
password :{
  type  : String,
  required : true
} ,
img : {
  default : null
},
phone: Number,
date:{
    typ
    e: Date,
    default: Date.now
}

Agent Table
name :{
    type  : String,
    required : true
} ,
email :{
  type  : String,
  required : true
} ,
password :{
  type  : String,
  required : true
} ,


T_pending{
   
}
T_completed{

}



Ticket Table
T_name :{
    type  : String,
    required : true
} ,

Agent_id:{
    type : String,
}

T_type:{
  type  : String,
  required : true
} ,

T_status :{
  type  : String,
  required : true
} ,
T_description: {
  type : String
},
T_email:{
  type: String
},
T_date:{
    date:{
        type: Date,
        default: Date.now
}

Response Table{
    T_id :{
       type: Number,
    }
    Sender_id:{
        
    }
    R_desc:{
        type: String,
    }
    date : {
        type: Date,
        default: Date.now
    }
    R_files{
        type: String,

    }
}

Forward Table{
    T_id{
        type:Number,
    }
    Agent_id{
        type:Number,
    }
    Forwarded_to{
        type:Number,
    }
    Date{
        type: Date,
        default: Date.now.length,
    }
}