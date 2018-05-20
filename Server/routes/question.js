/**
 * Created by techlove on 6/30/17.
 */
var express = require('express');
var router = express.Router();
var BaseResponse    = require('../utils/BaseResponse');
var Code = require('../utils/Code');
const pool = require('../lib/db');

var crypto = require('crypto');
var mime = require('mime');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/question')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});
var upload = multer({ storage: storage });

// api get all question
router.get('/getAllQuestion', function (req, res) {
    pool.query('select * from question WHERE is_deleted IS NULL', function (err, result) {
        if(err) {
            res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
            return console.error('error running query', err);
        } else {
            res.json(BaseResponse.SuccessResponse(result.rows));
        }
    });
});

//api get detail question
router.get('/:id', function (req, res) {
    console.log(req.params.id);
    pool.query('select * from question WHERE id=$1 AND is_deleted IS NULL', [parseInt(req.params.id)], function (err, result) {
        if(err) {
            res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
            return console.error('error running query', err);
        } else {
            res.json(BaseResponse.SuccessResponse(result.rows));
        }
    });
});

//api add a question
router.post('/addQuestion', upload.single('file'), function (req, res) {
    console.log('-- call api add question --');
    console.log(req.file.path);
    checkInput(req, res);
    let img = req.file.path? req.file.path.replace('public/', '/') : null;
    let answer = req.body.answer;
    let type = req.body.type;
    let answerA = req.body.answerA;
    let a_id = req.body.a_id;
    let answerB = req.body.answerB;
    let b_id = req.body.b_id;
    let answerC = req.body.answerC;
    let c_id = req.body.c_id;
    let answerD = req.body.answerD;
    let d_id = req.body.d_id;
    console.log(d_id);

    console.log(req.body);

    const query = {
        text: 'INSERT INTO question(image, answer, type, a, a_id, b, b_id, c, c_id, d, d_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        values: [img, answer, type, answerA, a_id, answerB, b_id, answerC, c_id, answerD, d_id]
    }
    //save question to db
    pool.query(query, function(err, result) {
        if(err){
            return console.error('error running query', err);
        }
        else {
            res.json(BaseResponse.SuccessResponse(result));
            console.log(result);
        }
    });
});

// api update question
router.put('/:id', upload.single('file'), function (req, res) {
    console.log('-- call api update question --');
    // console.log(req.file.path);
    let id = req.params.id;
    const queryFindQuestion = 'SELECT * FROM QUESTION WHERE id=$1 AND is_deleted IS NULL';
    pool.query(queryFindQuestion, [id], function (err, result) {
        if(err){
            return res.send(BaseResponse.FailResponse(500, 'Couldn\'t connect to server'));
        }
        if(!result.rows.length){
            return res.send(BaseResponse.FailResponse(404, 'Question does not exist'));
        }
        //else has question -> update
        checkInput(req, res);
        let img = req.file? req.file.path.replace('public/', '/') : null;
        let answer = req.body.answer;
        let type = req.body.type;
        let answerA = req.body.answerA;
        let a_id = req.body.a_id;
        let answerB = req.body.answerB;
        let b_id = req.body.b_id;
        let answerC = req.body.answerC;
        let c_id = req.body.c_id;
        let answerD = req.body.answerD;
        let d_id = req.body.d_id;
        console.log(d_id);

        console.log(req.body);

        let updateImg = '';
        if(img) updateImg = ', image=' + "'" + img + "'";

        const query = {
            text: 'UPDATE question SET answer = $1, type = $2, a = $3, a_id = $4, b = $5, b_id = $6, c = $7, c_id = $8, d = $9, d_id = $10 ' + updateImg + ' WHERE id='+id,
            values: [answer, type, answerA, a_id, answerB, b_id, answerC, c_id, answerD, d_id]
        }
        //update question to db
        pool.query(query, function(err, result) {
            if(err){
                return console.error('error running query', err);
            }
            else {
                return res.json(BaseResponse.SuccessResponse(result));
                console.log(result);
            }
        });
    });

});

//api delete a question
router.delete('/:id', function (req, res) {
    let id = req.params.id;
    const queryFindQuestion = 'SELECT * FROM QUESTION WHERE id=$1 AND is_deleted IS NULL';
    pool.query(queryFindQuestion, [id], function (err, result) {
        if (err) {
            return res.send(BaseResponse.FailResponse(500, 'Couldn\'t connect to server'));
        }
        if (!result.rows.length) {
            return res.send(BaseResponse.FailResponse(404, 'Question does not exist'));
        }
        var query = 'UPDATE question SET is_deleted = ' + 1 + ' WHERE id=' + id;
        pool.query( query , function(err, result) {
            if(err) {
                return res.send(BaseResponse.FailResponse(500, 'Couldn\'t connect to server'));
            }
            return res.json(BaseResponse.SuccessResponse());
            // console.log(result);
        });
    });
});

function checkInput(req, res) {
    var params = req.body;
    if (!params.answer) return res.json(BaseResponse.FailResponse(Code.error.required_field.code, "Answer is required"));
    if (!params.type) return res.json(BaseResponse.FailResponse(Code.error.required_field.code, "Type is required"));

}

module.exports = router;