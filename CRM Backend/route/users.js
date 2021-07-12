const express = require('express');
var session = require('express-session');
const { Db } = require('mongodb');
const Ticket = require('../models/createticket.js');
const router = express.Router();
const User = require("../models/user.js")
const Agent = require("../models/agent.js")
// router.post('/profile',(req,res)=>{
//     const data = req.body;
//     let s_email = session.email;
//     await User.updateOne({ email: email},{$set:data});
//     res.send("Profile Updated Successfully!");
// })

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
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/login');
 });
})

module.exports  = router;