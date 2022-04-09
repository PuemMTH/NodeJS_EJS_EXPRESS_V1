var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ku-cs"
});

module.exports.discord_logs = function(req, res) {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM discord_logs", function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
    });
}