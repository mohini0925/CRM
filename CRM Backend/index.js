const express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const router = express.Router();
const mongoose = require('mongoose');
var session = require('express-session');
const app = express();
var cors = require('cors');
const multer = require('multer');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname+'/uploads'));
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

mongoose.connect("mongodb://localhost:27017/crm",{useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    console.log("Connected to MongoDB Server");
});


app.use('/',require('./route/users'));

//Creating Server

app.listen(3000, ()=>{
    console.log("server is running");
});
