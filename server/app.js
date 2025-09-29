const express = require('express');
const path = require('path');
// const http = require('http');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const cors = require('cors');

const connectDB = require('./db/mongoConnect');
const { routesInit } = require('./routes/config_routes');
const { compare } = require('bcrypt');

const app = express();
app.use(cors());

connectDB();

app.use(express.json());



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
   
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

console.log(__dirname + " line 11");

routesInit(app);

let port = process.env.PORT || 3000;
app.listen(port);



