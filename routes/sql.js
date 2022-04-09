const express = require("express");
const rout = express.Router();
const sqlRoutes = require('../api/sql/mysql');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })

rout.get('/', sqlRoutes.getHomePage);

// Check Email Address Return Status (true/false)
rout.post('/c_mal', urlencodedParser , sqlRoutes.postC_mal);
rout.post('/a_use', urlencodedParser , sqlRoutes.addUsers);

rout.post('/check', urlencodedParser, function(req, res){
    rbe = req.body.email;
    res.send("Hello World" + rbe);
});

module.exports = rout;