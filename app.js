'use strict';
const mongooseConnect = require('./database-config')
const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const profileRoutes = require('./src/routes/profile');

// set the view engine to ejs
app.set('view engine', 'ejs');

//parse json
app.use(express.json())

// routes
app.use('/profile', profileRoutes());

//connect to mongo tmp server
mongooseConnect().catch(console.dir);

// start server
const server = app.listen(port);
console.log('Express started. Listening on %s', port);
