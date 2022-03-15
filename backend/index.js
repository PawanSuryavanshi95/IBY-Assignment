'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require("http");

var path = require('path');
global.__appRoot = path.resolve(__dirname);

const authRoutes = require('./routes/Auth');
const sessionRoutes = require('./routes/Session');

const app = express();

const db = require('./db');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/assets', express.static('public'));

mongoose.connect('mongodb://localhost:27017/IBY_CV', {useNewUrlParser : true, useUnifiedTopology: true }, ()=>{
    console.log('Mongodb Connected');
});

const authenticate = require('./middleware/Authentication');

app.use('/api/auth', authRoutes);
app.use('/api/session', authenticate, sessionRoutes);

app.get('/', (req,res)=>{
    res.send(`Server is up and running`);
})

app.get('/data', async (req,res)=>{
    const data = await db.User.find({});
    const data2 = await db.Session.find({});
    res.json({data, data2});
})

const port = process.env.PORT||5050;

app.listen(port, ()=>{
    console.log('server started at ' + port);
})
