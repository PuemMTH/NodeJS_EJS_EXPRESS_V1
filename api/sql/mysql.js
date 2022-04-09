const config = require("../../config.json");
// axios
const axios = require('axios');

exports.getHomePage = (req, res) => {
    let query = "SELECT * FROM `users`"; // query database to get all the players
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('users.ejs', {
            title: "Welcome to Socka | View Players",
            users: result,
            host: config.host
        });
    });
};
exports.postC_mal = (req, res) => {
    rbe = req.body.email;
    if(!rbe){
        return res.status(400).send('Bad Request');
    }else{
        let query = "SELECT user_email FROM users WHERE user_email = ?";
        db.query(query, [rbe], function(err, result){
            if (err) throw err;
            obj = JSON.stringify(result);
            obj2 = JSON.parse(obj);
            if(Object.keys(obj2).length > 0){
                return res.status(200).json({
                        msg: "Found",
                        status: true,
                        Notifly: obj2
                });
            }else{
                console.log(Object.keys(obj2).length);
                return res.status(200).json({
                        msg: "Not Found",
                        status: false,
                        Notifly: obj2
                });
            }
        });
    }
};

exports.addUsers = (req, res) => {

    if(!req.body.useremail || !req.body.usermname_en1){
        return res.status(400).send('Bad Request');
    }
    (async () => {
        const response = await axios.get('https://api.ipify.org?format=json');
        const useremail = await req.body.useremail.toLowerCase();
        const usermname_en1 = await req.body.usermname_en1.toUpperCase();
        const usermname_en2 = await req.body.usermname_en2.toUpperCase();
        const usermname_th1 = await req.body.usermname_th1;
        const usermname_th2 = await req.body.usermname_th2;
        const user_ip = await response.data.ip;
        const password = await req.body.password;
        const created_at = await new Date();
        const query = "INSERT INTO `users` (`id_static`, `username_en`, `lastname_en`, `username_th`, `lastname_th`, `user_ipaddress`, `user_dateofbirth`, `user_email`, `user_password`, `user_gender`, `created_at`, `roled`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(query, [null, usermname_en1, usermname_en2, usermname_th1, usermname_th2, user_ip, "null", useremail, password, "null", created_at, "0"], (err, result) => {
            if (err) {
                return res.status(500).json({
                    msg: "Error",
                    status: false,
                    Notifly: []
                });
            }
            if(result.affectedRows > 0){
                return res.status(200).json({
                    msg: "Success",
                    status: true,
                    Notifly: result
                });
            }
        });
    })();
};

exports.checkACC = (req, res) => {
    // use bodyParser
    let email = req.body;
    console.log(email);
    res.end();
};
