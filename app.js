var express = require("express");
const mysql = require("mysql");
const dataRoutes = require("./routes/data");
const sqlRoutes = require("./routes/sql");
const config = require("./config.json");
const fs = require("fs");

var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const db = mysql.createConnection ({
  host: config.db_host,
  user: config.db_user,
  password: config.db_pass,
  database: config.db_name
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;

app.use((req, res, next) => {
  let date = new Date();
  let time = date.getHours() + "/" + date.getMinutes();
  let day = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  fs.writeFileSync("./log.txt", `[${day}/${time}] : ${req.method} ${req.url} ${req.ip}\n`, {flag: "a"});
  next();
});

app.use('/data', dataRoutes);
app.use('/sql', sqlRoutes);

app.get("*", function(req, res) {
  // res.redirect("/sql");
  res.status(404);
  res.render("404", { id: "404" });
});

let port = config.port || process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Server Start in port " + port);
});
 