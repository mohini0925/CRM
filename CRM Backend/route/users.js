const express = require('express');
var session = require('express-session');
const { Db } = require('mongodb');
const Ticket = require('../models/createticket.js');
const router = express.Router();
const User = require("../models/user.js")
const Agent = require("../models/agent.js")
const Response = require("../models/response.js")

router.post('/profile',async (req,res)=>{
    const {name,phone,email,password} = req.body;
    const s_email = req.session.email;
    if(!name || !email || !password || !phone){
        res.status(400).json({error:true,message : "Please fill all fields!" });
    }else if(phone.length < 10){
        res.status(400).json({error:true,message : "Mobile No. should contain 10 digits" });
    }else if(password.length < 6){
        res.status(400).json({error:true,message : "Password should contain 6 characters" });
    }else{
    await User.updateOne({ email: s_email},{$set:{
        name : name,
        phone : phone,
        email : email,
        password : password,
    }}).exec(function (err,user){
        if (err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
          res.status(200).json({error:false,message: "Profile Updated Successfully"});
        }
    });
}})

router.get('/singleticket/:id',(req,res)=>{
    const id = req.params.id;
    Ticket.findOne({_id : id}).exec(function(err,ticket){
        if(err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false, data: ticket})
            console.log(ticket);
        }
    })

})

router.get('/response/:id',(req,res)=>{
    const id = req.params.id;
    Response.find({T_id : id}).sort({R_date : 1}).exec(function(err,response){
        if(err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false, data: response})
            console.log(response);
        }
    })

})



router.get('/session',(req,res)=>{
    const sess = req.session.email;
    console.log(sess);

    User.findOne({email : sess}).exec(function (err,user){
        if (err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false,email: user.email, name : user.name});
            console.log(user.name)
        }
    })
})

router.get('/viewticket',(req,res)=>{
    const sess = req.session.email;
    console.log(sess);
    Ticket.find({T_email : sess}).sort({T_date : -1}).exec(function(err,ticket){
        if(err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false, data: ticket})
            console.log(ticket);
        }
    })
})

router.get('/profile',(req,res)=>{
    const sess = req.session.email;
    console.log(sess);

    User.findOne({email : sess}).exec(function (err,user){
        if (err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false,email: user.email, name : user.name, password : user.password , phone : user.phone});
            console.log(user.phone)
        }
    })
})

router.post('/createTicket',(req,res)=>{
    const {T_name,T_type,T_desc} = req.body;
    const sess = req.session.email;
    console.log(sess);

    if(!T_name || !T_type || !T_desc){
        res.status(400).json({error:true,message : "Please fill all fields!" });
    }
    else{Agent.findOne().sort({T_pending: 1}).limit(1).exec(function (err,result){
        if (err){
            console.log("Error query");
        }
        else{
            console.log(result.email);
            const minVal = result.email;
            const newTicket = new Ticket({
                T_name : T_name,
                T_type : T_type,
                T_desc : T_desc,
                T_status : "Pending",
                Agent_id : minVal,
                T_email : sess,
            })
            newTicket.save();
            res.status(200).json({error:false,message: "Your Ticket has been sent to Agent"});
        }
    });
}

})

//Reponse Text
router.post('/response',(req,res)=>{
    const {T_id,Sender_email,R_text} = req.body;
    if(!R_text){
        res.status(400).json({error:true,message : "Enter some text!" });
    }else{
                
                const newResponse = new Response({
                    T_id : T_id,
                    Sender_email : Sender_email,
                    R_text : R_text,
                })
                newResponse.save();
                res.status(200).json({error:false,message: "Response Added"});
            
            }
        })

//Register handle
router.post('/register',(req,res)=>{
    const {name,phone,email,password} = req.body;
    if(!name || !email || !password || !phone){
        res.status(400).json({error:true,message : "Please fill all fields!" });
    }else if(phone.length < 10){
        res.status(400).json({error:true,message : "Mobile No. should contain 10 digits" });
    }else if(password.length < 6){
        res.status(400).json({error:true,message : "Password should contain 6 characters" });
    }else{
        User.findOne({email:email}).exec((err,user)=>{
            if(user){
                res.status(400).json({error:true,message : "Email Id Already Exists" });
            }else{
                
                const newUser = new User({
                    name : name,
                    phone : phone,
                    email : email,
                    password : password,
                })
                newUser.save();
                req.session.email = email;
                res.status(200).json({error:false,message: "Added"});
            }
        })
    }
})

router.post('/login', function(req, res) {

    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({error:true,message : "Please fill in fields!" });}
    else{User.findOne({ email: email }, function(err, user) {
      if (!user) {
            res.status(400).json({error:true,message: "Email doesn't exist"});

      } else {
        if (password === user.password) {
            req.session.email = email;
            console.log(req.session)
            res.status(200).json({error:false});
        } else {
            res.status(400).json({error:true,message: "Password is Invalid"});
        }
      }
    })
   }
  });  


//logout
router.get('/logout',(req,res)=>{
    const sess = req.session.email;
    console.log(sess);
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        else{
            res.status(200).json({error:false,message:"You Logged Out"});
            console.log("Destroyed");
        
    }
        
 });

})


module.exports  = router;