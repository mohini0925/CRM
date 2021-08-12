const express = require('express');
var session = require('express-session');
var nodemailer = require('nodemailer');
const { Db } = require('mongodb');
const Ticket = require('../models/createticket.js');
const router = express.Router();
const User = require("../models/user.js")
const Agent = require("../models/agent.js")
const Response = require("../models/response.js")
const multer = require('multer');

//Setting storage
const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null,'uploads');
    },
    filename(req, file, callback) {
      callback(null,Date.now() + '-' + file.originalname);
    },
  });


const upload = multer({
    storage : storage,
    limits: { fieldSize: 5* 1024 * 1024 }
  });



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'panchalmohini1@gmail.com',
      pass: 'Mohini*2509'
    }
  });



router.post('/profile',async (req,res)=>{
    const {name,phone,email,password} = req.body;
    const s_email = req.session.email;
    if(!name || !email || !password || !phone){
        res.status(400).json({error:true,message : "Please fill all the fields" });
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

router.post('/Agentprofile',async (req,res)=>{
    const {name,email,password} = req.body;
    const s_email = req.session.email;
    if(!name || !email || !password){
        res.status(400).json({error:true,message : "Please fill all the fields" });
    }else if(password.length < 6){
        res.status(400).json({error:true,message : "Password should contain 6 characters" });
    }else{
    await Agent.updateOne({ email: s_email},{$set:{
        Aname : name,
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
        }
    })
})


router.get('/searchTicket',(req,res)=>{
    const sess = req.session.email;
    const search = req.query.search;
    console.log(search);
    Ticket.find({$or:[{T_name :{'$regex': search }},{T_status : {'$regex': search }},{T_desc : {'$regex': search }}],T_email : sess}).sort({T_date : -1}).exec(function(err,ticket){
        if(!ticket){
            res.status(400).json({error:true,message: "No Tickets Found. Search Again!"})
        }
        else{
            res.status(200).json({error:false, data: ticket})
        }
    });

});

router.get('/searchAgentTicket',(req,res)=>{
    const sess = req.session.email;
    const search = req.query.search;
    console.log(search);
    Ticket.find({$or:[{T_name :{'$regex': search }},{T_status : {'$regex': search }},{T_desc : {'$regex': search }}],Agent_id : sess}).sort({T_date : -1}).exec(function(err,ticket){
        if(!ticket){
            res.status(400).json({error:true,message: "No Tickets Found. Search Again!"})
        }
        else{
            res.status(200).json({error:false, data: ticket})
        }
    });

});

router.get('/searchAgentList',(req,res)=>{
    const sess = req.session.email;
    const search = req.query.search;
    console.log(search);
    Agent.find({$or:[{Aname :{'$regex': search }},{ email : {'$regex': search  }}],'email':{'$ne' : sess}}).sort({Aname : -1}).exec(function(err,list){
        if(!list){
            res.status(400).json({error:true,message: "No List Found. Search Again!"})
        }
        else{
            res.status(200).json({error:false, data: list})
        }
    });

});

router.get('/countTicket', async (req,res)=>{
    const sess = req.session.email;
    const countP = await Ticket.countDocuments({T_email : sess, T_status : "Pending"});
    const countI = await Ticket.countDocuments({T_email : sess , T_status : "In Progress"});
    const countD = await Ticket.countDocuments({T_email : sess ,T_status : "Done"});
    res.status(200).json({error:false, cpending : countP , cprogress : countI , cdone : countD});
})

router.get('/AcountTicket', async (req,res)=>{
    const sess = req.session.email;
    const countP = await Ticket.countDocuments({Agent_id : sess, T_status : "Pending"});
    const countI = await Ticket.countDocuments({Agent_id : sess , T_status : "In Progress"});
    const countD = await Ticket.countDocuments({Agent_id : sess ,T_status : "Done"});
    res.status(200).json({error:false, cpending : countP , cprogress : countI , cdone : countD});
})


router.get('/response/:id',(req,res)=>{
    const id = req.params.id;
    const sess = req.session.email;
    Response.find({T_id : id}).sort({R_date : 1}).exec(function(err,response){
        if(err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false, data: response})
        }
    })

})

router.get('/session',(req,res)=>{
    const sess = req.session.email;

    User.findOne({email : sess}).exec(function (err,user){
        if (err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false,email: user.email, name : user.name});
        }
    })
})

router.get('/viewticket',(req,res)=>{
    const sess = req.session.email;
    const count = Ticket.countDocuments({T_email : sess}).exec();
    
    Ticket.find({T_email : sess}).sort({T_date : -1}).exec(function(err,ticket){
        if(err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false, data: ticket});
        }
    })
})

router.get('/agentlist', async (req,res)=>{
    const sess = req.session.email;
    await Agent.find({'email' : {'$ne' : sess}}).sort({Aname : -1}).exec(function(err,list){
        if(err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false, data: list});
        }
    })
})


router.get('/Aviewticket',(req,res)=>{
    const sess = req.session.email;
    
    Ticket.find({Agent_id : sess}).sort({T_date : -1}).exec(function(err,ticket){
        if(err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false, data: ticket});
        }
    })
})

router.get('/pendingTicket',(req,res)=>{
    const sess = req.session.email;
    const status = req.query.status;
    
    Ticket.find({Agent_id : sess, T_status : status}).sort({T_date : -1}).exec(function(err,ticket){
        if(err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false, data: ticket});
        }
    })
})



router.get('/profile',(req,res)=>{
    const sess = req.session.email;

    User.findOne({email : sess}).exec(function (err,user){
        if (err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false,email: user.email, name : user.name, password : user.password , phone : user.phone});
        }
    })
})

router.get('/Agentprofile',(req,res)=>{
    const sess = req.session.email;

    Agent.findOne({email : sess}).exec(function (err,user){
        if (err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            res.status(200).json({error:false,email: user.email, name : user.Aname, password : user.password});
        }
    })
})

router.post('/createTicket',upload.single('myFile'),(req,res)=>{
    console.log(req.file);
    const T_name = req.body.T_name;
    const T_type = req.body.T_type;
    const T_desc = req.body.T_desc;
    const fileName = req.file ? req.file.filename : null;
    const sess = req.session.email;

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
                T_image : req.file ? fileName : null,
                T_status : "Pending",
                Agent_id : minVal,
                T_email : sess,
            })
            newTicket.save();
            Agent.updateOne({ email: minVal},{$set:{
                Aname : result.Aname,
                email : minVal,
                password : result.password,
                T_pending : result.T_pending + 1,
                T_completed : result.T_completed,
            }}).exec(function(err,agent){
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.status(200).json({error:false,message: "Your Ticket has been sent to Agent"});
                    }
            });

           
        }
    });
}

})
//Foward Ticket
router.get('/forwardticket/:email/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const Aemail = req.params.email;
    console.log(Aemail)
    const sess = req.session.email;
    Ticket.findOne({_id : id}).exec(function(err,ticket){
        if(err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            Ticket.updateOne({Agent_id : ticket.Agent_id},{$set:{
                Agent_id : Aemail,
            }}).exec(function(err,agent){
                if(err){
                    res.status(400).json({error:true})
                    console.log(err)
                }else{
                    Agent.findOne({email : sess}).exec(function(err,sessionagent){
                        if(err){
                            res.status(400).json({error:true})
                            console.log(err)
                        }
                        else{  Agent.updateOne({email : sess},{$set:{
                                T_pending : sessionagent.T_pending - 1,
                        }}).exec();
                        }})
                          Agent.findOne({email : Aemail}).exec(function(err,newagent){
                            if(err){
                                res.status(400).json({error:true})
                                console.log(err)
                            }
                            else{  Agent.updateOne({email: Aemail},{$set:{
                                    T_pending : newagent.T_pending + 1,
                            }}).exec();
                            }})
                    res.status(200).json({error:false,message: "Ticket Forwarded"});
            }
        })
    }})
})


router.get('/completeticket/:id', (req,res)=>{
    const id = req.params.id;

    const sess = req.session.email;
    Ticket.findOne({_id : id}).exec(function(err,ticket){
        if(err){
            res.status(400).json({error:true})
            console.log(err)
        }
        else{
            Ticket.updateOne({_id : ticket._id},{$set:{
               T_status : "Done",
            }}).exec(function  (err,agent){
                if(err){
                    res.status(400).json({error:true})
                    console.log(err)
                }else{
                     Agent.findOne({email : sess}).exec(function(err,results){
                        if(err){
                            res.status(400).json({error:true})
                            console.log(err)
                        }
                        else{Agent.updateOne({email : sess},{$set:{
                              T_pending : results.T_pending - 1,
              
                              T_completed : results.T_completed + 1,
                      
                            }}).exec();
                        }})
                    res.status(200).json({error:false,message: "You Completed Your Task!"});
            }
        })
    }})
})
//Reponse Text
router.post('/response', async (req,res)=>{
    const {T_id,Sender_email,R_text} = req.body;
    const countR = await Agent.countDocuments({email : Sender_email});
    console.log(countR);
    if(!R_text){
        res.status(400).json({error:true,message : "Enter some text!" });
    }else{
                
                const newResponse = new Response({
                    T_id : T_id,
                    Sender_email : Sender_email,
                    R_text : R_text,
                })
                newResponse.save();
                if(countR > 0){
                    Ticket.updateOne({_id : T_id},{$set:{
                        T_status : "In Progress",
                    }}).exec();
                }
                res.status(200).json({error:false,message: "Response Added"});
            
            }
        })

//Register handle
router.post('/register',(req,res)=>{
    const {name,phone,email,password} = req.body;
    if(!name || !email || !password || !phone){
        res.status(400).json({error:true,message : "Please fill all the fields!" });
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
        res.status(400).json({error:true,message : "Please fill all the fields!" });}
    else{User.findOne({ email: email }, function(err, user) {
      if (!user) {
            res.status(400).json({error:true,message: "Email Id doesn't exist"});

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

  router.post('/loginagent', function(req, res) {

    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({error:true,message : "Please fill all the fields!" });}
    else{Agent.findOne({ email: email }, function(err, user) {
      if (!user) {
            res.status(400).json({error:true,message: "Email Id doesn't exist"});

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

//forgotpassword
router.post('/forgotpassword', function(req, res) {

    const {email} = req.body;
    if(!email){
        res.status(400).json({error:true,message : "Please enter your Email!" });}
    else{User.findOne({ email: email }, function(err, user) {
      if (!user) {
            res.status(400).json({error:true,message: "Email Id doesn't exist"});

      } else {
         const email = user.email;
         const pass = user.password;
         var mailOptions = {
            from: 'panchalmohini1@gmail.com',
            to: email,
            subject: 'Password for your CRM Application',
            html : '<h1>Hello '+user.name+'</h1><br><h2>This is your password :'+pass+'</h2>'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).json({error:false,message: "Password has been sent to your email. Please login again"});
            }
          });
        }
      })
   }});


//logout
router.get('/logout',(req,res)=>{
    const sess = req.session.email;
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