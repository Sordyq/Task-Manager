require('dotenv').config()
const express = require('express');
const connectdb = require('./ConnectDb/connectdb');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const router = require('./Router/handler')

const port = 1000;
const password = process.env.pass


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:'Milan',
    resave:false,
    saveUninitialized:true,
    cookie: {maxAge: 24 * 64000}
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', router);

app.listen(port, () =>{
    connectdb()
    console.log(`server connected on ${port}`);
})