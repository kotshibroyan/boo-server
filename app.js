"use strict";
const mongooseConnect = require("./database-config");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const profileRoutes = require("./src/routes/profile");
const celebrityRoutes = require("./src/routes/celebrity");
const commentRoutes = require("./src/routes/comment");

// set the view engine to ejs
app.set("view engine", "ejs");

//parse json
app.use(express.json());

// routes
app.use("/profiles", profileRoutes());
app.use("/celebrities", celebrityRoutes());
app.use("/comments", commentRoutes());

//connect to mongo tmp server
mongooseConnect().catch(console.dir);

// start server
app.listen(port);
console.log("Express started. Listening on %s", port);
