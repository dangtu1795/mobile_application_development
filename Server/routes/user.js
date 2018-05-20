var express = require('express');
var router = express.Router();
var BaseResponse    = require('../utils/BaseResponse');
var Code = require('../utils/Code');
var Helper = require('../utils/Helper');
const pool = require('../lib/db');

var bcrypt   = require('bcrypt-nodejs');

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
    if (req.session && req.session.user === "amy" && req.session.admin)
        return next();
    else
        // return res.sendStatus(401);
        return res.json(BaseResponse.FailResponse(1003, "Invalid token"));
};

router.post('/addNewUserDictionary', auth, function (req, res) {
    var username = req.body.username;
    var password = generateHash(req.body.password);

    pool.query('INSERT INTO "user"(username, password) VALUES($1, $2)', [username, password], function (err, result) {
        if(err) {
            return console.error('error running query', err);
        } else {
            console.log(result);
            res.json(BaseResponse.SuccessResponse());
        }
    });
});

router.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    pool.query('select * from "user" where username = ($1)::varchar', [username], function (err, result) {
        if(err) {
            return console.error('error running query', err);
        } else {
            console.log(result);
            // console.log(result.rows[0].password);
            // console.log( bcrypt.compareSync(password.toString(), result.rows[0].password) );
            if(result.rows.length<1){
                res.json(BaseResponse.FailResponse(1001, "Username or password is not valid!")); return;
            } else if(!bcrypt.compareSync(password.toString(), result.rows[0].password)){
                res.json(BaseResponse.FailResponse(1002, "Password is not valid!")); return;
            }
            else {
                var newToken = Helper.RandomString();
                pool.query('update "user" set token = ($1) where id=$2 returning token, username', [newToken, result.rows[0].id], function (err, result1) {
                    if(err) {
                        return console.error('error running query', err);
                    } else {
                        console.log(result1);
                        res.json(BaseResponse.SuccessResponse(result1.rows[0]));
                    }

                });
            }
        }
    });
});

// đăng xuất
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

function isLoggedIn(req, res, next) {

// nếu người dùng đã đăng nhập thì tiếp tục thực hiện
    if (req.isAuthenticated())
        return next();

// ngược lại điều hướng về đăng nhập.
    res.redirect('/login');
}

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(password, pass2) {
    return bcrypt.compareSync(password, pass2);
};

module.exports = router;