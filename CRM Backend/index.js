const express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const router = express.Router();
const mongoose = require('mongoose');
var session = require('express-session');
const app = express();

app.use(bodyParser.json());

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

mongoose.connect("mongodb://localhost:27017/crm",{useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    console.log("Connected to MongoDB Server");
});


app.use('/',require('./route/users'));

//Creating Server

app.listen(3000, ()=>{
    console.log("server is running");
});
