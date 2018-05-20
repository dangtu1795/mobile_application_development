var express = require('express');
var router = express.Router();
var BaseResponse    = require('../utils/BaseResponse');
var Code = require('../utils/Code');
const pool = require('../lib/db');

var crypto = require('crypto');
var mime = require('mime');
var multer  = require('multer');
var words = require('../words.json');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/sounds')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, file.originalname );
        });
    }
});
var upload = multer({ storage: storage });

var createWords = function (index, res) {
    if(index == 595) {
        return res.send({
            message: 'create successful!'
        })
    }
    let word = words.data[index];
    console.log('index: ', index, ',word: ', word.text );
    var text = word.text;
    var tansuat = word.tansuat;
    var separation2 = false;

    var separation1 = " ";
    var spell1 = word.spell1;
    var type1 = word.type1;
    var sound1 = word.sound1;
    var sound2 = '';
    var content1 = word.content1;
    pool.query('SELECT * FROM word WHERE text=$1::varchar AND is_deleted IS NULL', [text], function(err, result) {
        // console.log(result);
        if(err) {
            return console.error('error running query', err);
        } else if(result.rows.length>0){
            console.log('từ đã tồn tại: ', text);
            return;
        } else {
            /*new query - insert text*/
            pool.query('INSERT INTO word(text, tansuat) VALUES($1, $2) RETURNING id', [text, tansuat], function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                } else {
                    //insert detail 1
                    pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [result.rows[0].id, separation1, spell1, type1, sound1,
                        sound2, content1], function(err, result1) {
                        if(err) {
                            return console.error('error running query', err);
                        } else {
                            //insert detail 2
                            if(result1) {
                                createWords(index +1, res)
                            }
                        }
                        // res.json(BaseResponse.SuccessResponse(result));
                        // console.log(result);
                    });
                }

            });
        }
    });
}

router.get('/', function (req, res) {
    createWords(0, res);
});

router.post('/addNewWord', upload.fields([{name: 'sound1', maxCount: 1}, {name: 'sound2', maxCount: 1}, {name: 'sound3', maxCount: 1},
    {name: 'sound4', maxCount: 1}, {name: 'sound5', maxCount: 1}, {name: 'sound6', maxCount: 1}, {name: 'sound7', maxCount: 1},
    {name: 'sound8', maxCount: 1}, {name: 'sound9', maxCount: 1}, {name: 'sound10', maxCount: 1} ]), function (req, res) {

    console.log(req.body);

    // console.log(req.files['sound1']);
    // console.log(req.files['sound1'][0].path.replace('public/', '/'));
    // console.log(req.files['sound2'][0].path.replace('public/', '/'));

    // var textF = req.body.text;

    var text = req.body.text;
    var tansuat = req.body.tansuat;

    var separation1 = req.body.separation1;
    var spell1 = req.body.spell1;
    var type1 = req.body.type1;
    var sound1 = req.files['sound1']? req.files['sound1'][0].path.replace('public/', '/'): null;
    var sound2 = req.files['sound2']? req.files['sound2'][0].path.replace('public/', '/') : null;
    var content1 = req.body.content1;

    if(req.body.separation2){
        var separation2 = req.body.separation2 ;
        var spell2 = req.body.spell2 ;
        var type2 = req.body.type2 ;
        var sound3 = req.files['sound3']? req.files['sound3'][0].path.replace('public/', '/') : null;
        var sound4 = req.files['sound4']? req.files['sound4'][0].path.replace('public/', '/') : null;
        var content2 = req.body.content2 ;
    }
    if(req.body.separation3){
        var separation3 = req.body.separation3;
        var spell3 = req.body.spell3 ;
        var type3 = req.body.type3 ;
        var sound5 = req.files['sound5']? req.files['sound5'][0].path.replace('public/', '/') : null;
        var sound6 = req.files['sound6']? req.files['sound6'][0].path.replace('public/', '/') : null;
        var content3 = req.body.content3;
    }
    if(req.body.separation4){
        var separation4 = req.body.separation4 ;
        var spell4 = req.body.spell4 ;
        var type4 =  req.body.type4 ;
        var sound7 = req.files['sound7']? req.files['sound7'][0].path.replace('public/', '/') : null;
        var sound8 = req.files['sound8']? req.files['sound8'][0].path.replace('public/', '/') : null;
        var content4 = req.body.content4 ;
    }
    if(req.body.separation5){
        var separation5 = req.body.separation5 ;
        var spell5 = req.body.spell5 ;
        var type5 = req.body.type5;
        var sound9 = req.files['sound9']? req.files['sound9'][0].path.replace('public/', '/') : null;
        var sound10 = req.files['sound10']? req.files['sound10'][0].path.replace('public/', '/') : null;
        var content5 = req.body.content5 ;
    }

    //
    // //to run a query we just pass it to the pool
    // //after we're done nothing has to be taken care of
    // //we don't have to return any client to the pool or close a connection

    /*check if exist text in table*/
    pool.query('SELECT * FROM word WHERE text=$1::varchar AND is_deleted IS NULL', [text], function(err, result) {
        console.log(result);
        if(err) {
            return console.error('error running query', err);
        } else if(result.rows.length>0){
            res.json(BaseResponse.FailResponse(1001, "Từ đã tồn tại!"));
            return;
        } else {
            /*new query - insert text*/
            pool.query('INSERT INTO word(text, tansuat) VALUES($1, $2) RETURNING id', [text, tansuat], function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                } else {
                    console.log(result.rows[0].id);
                    //insert detail 1
                    pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [result.rows[0].id, separation1, spell1, type1, sound1,
                        sound2, content1], function(err, result1) {
                        if(err) {
                            return console.error('error running query', err);
                        } else {
                            //insert detail 2
                            if(separation2){
                                pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [result.rows[0].id, separation2, spell2, type2, sound3,
                                    sound4, content2], function(err, result2) {
                                    if(err) {
                                        return console.error('error running query', err);
                                    } else {
                                        //insert detail 3
                                        if(separation3){
                                            pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [result.rows[0].id, separation3, spell3, type3, sound5,
                                                sound6, content3], function(err, result3) {
                                                if(err) {
                                                    return console.error('error running query', err);
                                                } else {
                                                    //insert detail 4
                                                    if(separation4){
                                                        pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [result.rows[0].id, separation4, spell4, type4, sound7,
                                                            sound8, content4], function(err, result4) {
                                                            if(err) {
                                                                return console.error('error running query', err);
                                                            } else {
                                                                //insert detail 5
                                                                if(separation5){
                                                                    pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [result.rows[0].id, separation5, spell5, type5, sound9,
                                                                        sound10, content5], function(err, result5) {
                                                                        if(err) {
                                                                            return console.error('error running query', err);
                                                                        } else {
                                                                            res.json(BaseResponse.SuccessResponse(result));
                                                                            console.log(result5);
                                                                        }
                                                                        // res.json(BaseResponse.SuccessResponse(result));
                                                                        // console.log(result);
                                                                    });
                                                                } else {
                                                                    res.json(BaseResponse.SuccessResponse(result));
                                                                    console.log(result4);
                                                                }

                                                            }
                                                            // res.json(BaseResponse.SuccessResponse(result));
                                                            // console.log(result);
                                                        });
                                                    } else {
                                                        res.json(BaseResponse.SuccessResponse(result));
                                                        console.log(result3);
                                                    }

                                                }
                                                // res.json(BaseResponse.SuccessResponse(result));
                                                // console.log(result);
                                            });
                                        } else {
                                            res.json(BaseResponse.SuccessResponse(result));
                                            console.log(result2);
                                        }

                                    }
                                    // res.json(BaseResponse.SuccessResponse(result));
                                    // console.log(result);
                                });
                            } else {
                                res.json(BaseResponse.SuccessResponse(result));
                                console.log(result1);
                            }

                        }
                        // res.json(BaseResponse.SuccessResponse(result));
                        // console.log(result);
                    });
                }

            });
        }
    });


    // pool.query('SELECT * FROM word WHERE text=$1::varchar', [text], function(err, result) {
    //     console.log('-result query-');
    //     console.log(result);
    //     if(err) {
    //         return console.error('error running query', err);
    //     } else if(result.rows.length>0){
    //         pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [result.rows[0].id, separation, spell, type, sound1,
    //             sound2, content], function(err, result) {
    //             if(err) {
    //                 return console.error('error running query', err);
    //             }
    //             res.json(BaseResponse.SuccessResponse(result));
    //             console.log(result);
    //         });
    //     } else {
    //         pool.query('INSERT INTO word(text) VALUES($1) RETURNING id', [text], function(err, result) {
    //             if(err) {
    //                 return console.error('error running query', err);
    //             } else {
    //                 console.log(result.rows[0].id);
    //                 pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [result.rows[0].id, separation, spell, type, sound1,
    //                     sound2, content], function(err, result) {
    //                     if(err) {
    //                         return console.error('error running query', err);
    //                     }
    //                     res.json(BaseResponse.SuccessResponse(result));
    //                     console.log(result);
    //                 });
    //             }
    //
    //         });
    //     }
    //
    // });


});

//download word api
router.get('/downloadWord/:start/:count', function (req, res) {
    // console.log(req.params.start);
    // console.log(req.params.count);
    getWord(req.params.start, req.params.count, function (err, data) {
        var arr = data.rows, array_id = [];
        arr.forEach(function (word) {
            word['detail'] = [];
            array_id.push(word['id']);
        });
        // start query to get all detail with each id of word
        pool.query('select * from word_detail WHERE word_id=ANY($1::int[]) and is_deleted IS NULL',[array_id], function (err, result1) {
            if(err) {
                res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
                return console.error('error running query', err);
            } else {
                // console.log('----- result 1 ------');
                arr.forEach(function(word){
                    // console.log(word);
                    // console.log(result1.rows);
                    var arr_index = [];
                    result1.rows.forEach(function(detail){

                        if(detail.word_id === word.id){
                            word['detail'].push(detail);
                            arr_index.push(result1.rows.indexOf(detail));
                            // console.log(result1.rows.indexOf(detail));

                        }
                    });
                    arr_index.forEach(function (index) {
                        result1.rows.splice(0, 1);
                    });
                    // console.log(arr_index);
                });
                res.json(BaseResponse.SuccessResponse(arr));
            }
        });
        // end get detail
    });


    // var query1 = 'SELECT * from word where is_deleted is null order by tansuat desc offset ' + req.params.start;
    // if(req.params.count>0) {
    //     query1 = query1 + ' limit ' + req.params.count;
    //     pool.query(query1, function (err, result) {
    //         if (err) {
    //             res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
    //             return console.error('error running query', err);
    //         } else {
    //             var arr = [];
    //             for(var i =0; i<  result.rows.length; i++){
    //                 // console.log(result.rows[i]);
    //                 var a = result.rows[i];
    //                 // arr.push(a);
    //                 pool.query('select * from word_detail WHERE word_id=$1 and is_deleted IS NULL',[result.rows[i]['id']], function (err, result1) {
    //                     if(err) {
    //                         res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
    //                         return console.error('error running query', err);
    //                     } else {
    //                         console.log('----- result 1 ------');
    //                         // console.log(result1.rows);
    //                         a['detail'] = result1.rows;
    //                         arr = result1.rows;
    //
    //                         // for(var j=0; j<result1.rows.length; j ++){
    //                         //     result.rows[i]['detail'].push(result1.rows[j]);
    //                         // }
    //                     }
    //                 });
    //                 console.log(a);
    //             }
    //             res.json(BaseResponse.SuccessResponse(arr));
    //         }
    //     });
    // } else {
    //     pool.query(query1, function (err, result) {
    //         if (err) {
    //             res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
    //             return console.error('error running query', err);
    //         } else {
    //             var arr = [];
    //             for(var i =0; i<  result.rows.length; i++){
    //                 // console.log(result.rows[i]);
    //                 var a = result.rows[i];
    //                 // arr.push(a);
    //                 pool.query('select * from word_detail WHERE word_id=$1 and is_deleted IS NULL',[result.rows[i]['id']], function (err, result1) {
    //                     if(err) {
    //                         res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
    //                         return console.error('error running query', err);
    //                     } else {
    //                         console.log('----- result 1 ------');
    //                         // console.log(result1.rows);
    //                         a['detail'] = result1.rows;
    //                         arr.push(a);
    //
    //                         // for(var j=0; j<result1.rows.length; j ++){
    //                         //
    //                         // }
    //                     }
    //                 });
    //                 console.log(a);
    //             }
    //             res.json(BaseResponse.SuccessResponse(arr));
    //
    //         }
    //     });
    // }
});


// get all words api
router.get('/getListWords', function (req, res) {
    pool.query('select * from word WHERE is_deleted IS NULL', function (err, result) {
        if(err) {
            res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
            return console.error('error running query', err);
        } else {
            res.json(BaseResponse.SuccessResponse(result.rows));
        }
    });
});

// get all words
router.get('/getAllWords', function (req, res) {
    /*select join first row*/
    // pool.query('SELECT distinct on (word.id) word.id, word.text, word_detail.type, word_detail.separation, word_detail.spell FROM word INNER JOIN word_detail ON word_detail.word_id = word.id WHERE word.is_deleted IS NULL', function(err, result) {
    //     if(err) {
    //         return console.error('error running query', err);
    //     }
    //     res.json(BaseResponse.SuccessResponse(result.rows));
    //     console.log(result);
    // });
    pool.query('SELECT word.id, word.text, word.tansuat, word_detail.type FROM word LEFT JOIN word_detail ON word_detail.word_id = word.id WHERE word.is_deleted IS NULL GROUP BY word.id, word_detail.type', function(err, result) {
        if(err) {
            return console.error('error running query', err);
        } else {
            var arr = result.rows;
            var a = [];
            arr.forEach(function (re) {
               console.log(re);
               // re = re.toObject;
                pool.query('SELECT type FROM word_detail WHERE word_id = $1', [re.id], function (err, result1) {
                    console.log('query result');
                    console.log(result1);
                    a.push(result1);
                });
            });
            console.log('dkm');
            console.log(a);
            console.log('-end dkm-');
            console.log(result);
            res.json(BaseResponse.SuccessResponse(result.rows));
        }

    });
});

//get detail a word
router.get('/getDetail/:id', function (req, res) {
    var query = 'SELECT * FROM word INNER JOIN word_detail ON word.id = word_detail.word_id WHERE word.id=' + req.params.id + '::int';
    pool.query( query , function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        res.json(BaseResponse.SuccessResponse(result.rows));
        console.log(result);
    });
});

//update word
router.put('/updateWord/:id', upload.fields([ {name: 'sound1', maxCount: 1}, {name: 'sound2', maxCount: 1}, {name: 'sound3', maxCount: 1},
    {name: 'sound4', maxCount: 1}, {name: 'sound5', maxCount: 1}, {name: 'sound6', maxCount: 1}, {name: 'sound7', maxCount: 1},
    {name: 'sound8', maxCount: 1}, {name: 'sound9', maxCount: 1}, {name: 'sound10', maxCount: 1} ]), function (req, res) {
    console.log(req.body);
    var query = 'SELECT * FROM word WHERE id=' + req.params.id+"::int AND is_deleted IS NULL";
    pool.query( query , function(err, result) {
        if(err) {
            return console.error('error running query', err);
        } else if(result.rows.length>0){
            var text = req.body.text;
            var tansuat = req.body.tansuat;

            var id1 = req.body.id1;
            var separation1 = req.body.separation1;
            var spell1 = req.body.spell1;
            var type1 = req.body.type1;
            var sound1 = req.files['sound1']? req.files['sound1'][0].path.replace('public/', '/'): null;
            var sound2 = req.files['sound2']? req.files['sound2'][0].path.replace('public/', '/') : null;
            var content1 = req.body.content1;

            if(req.body.separation2){
                var id2 = req.body.id2;
                var separation2 = req.body.separation2 ;
                var spell2 = req.body.spell2 ;
                var type2 = req.body.type2 ;
                var sound3 = req.files['sound3']? req.files['sound3'][0].path.replace('public/', '/') : null;
                var sound4 = req.files['sound4']? req.files['sound4'][0].path.replace('public/', '/') : null;
                var content2 = req.body.content2 ;
            }
            if(req.body.separation3){
                var id3 = req.body.id3;
                var separation3 = req.body.separation3;
                var spell3 = req.body.spell3 ;
                var type3 = req.body.type3 ;
                var sound5 = req.files['sound5']? req.files['sound5'][0].path.replace('public/', '/') : null;
                var sound6 = req.files['sound6']? req.files['sound6'][0].path.replace('public/', '/') : null;
                var content3 = req.body.content3;
            }
            if(req.body.separation4){
                var id4 = req.body.id4;
                var separation4 = req.body.separation4 ;
                var spell4 = req.body.spell4 ;
                var type4 =  req.body.type4 ;
                var sound7 = req.files['sound7']? req.files['sound7'][0].path.replace('public/', '/') : null;
                var sound8 = req.files['sound8']? req.files['sound8'][0].path.replace('public/', '/') : null;
                var content4 = req.body.content4 ;
            }
            if(req.body.separation5){
                var id5 = req.body.id5;
                var separation5 = req.body.separation5 ;
                var spell5 = req.body.spell5 ;
                var type5 = req.body.type5;
                var sound9 = req.files['sound9']? req.files['sound9'][0].path.replace('public/', '/') : null;
                var sound10 = req.files['sound10']? req.files['sound10'][0].path.replace('public/', '/') : null;
                var content5 = req.body.content5 ;
            }


            var updateSound1 = '';
            var updateSound2 = '';
            if(sound1){
                updateSound1 = ', "sound1" = ' + "'"+ sound1 + "'";
            }
            if(sound2){
                updateSound2 = ', "sound2" = ' + "'"+ sound2 + "'";
            }


            var query1 = 'UPDATE "word" SET "text" = ($1), "tansuat" = ($2) WHERE id=' + req.params.id;
            pool.query( query1, [text, tansuat] , function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                } else {
                    //update item 1
                    var query_item1 = 'UPDATE word_detail SET type = ($1), separation = ($2), spell= ($3), content = ($4)' + updateSound1 + updateSound2 + ' WHERE id=$5';
                    pool.query(query_item1, [type1, separation1, spell1, content1, id1], function (err, result1) {
                        if(err){
                            return console.error('error running query', err);
                        } else {
                            //update item 2
                            if(separation2){
                                var query_item2 = '';
                                var updateSound3 = '';
                                var updateSound4 = '';
                                if(sound3){
                                    updateSound3 = ', "sound1" = ' + "'" + sound3 + "'";
                                }
                                if(sound4){
                                    updateSound4 = ', "sound2" = ' + "'" + sound4 + "'";
                                }
                                if(id2){
                                    var query_item2 = 'UPDATE word_detail SET type = ($1), separation=($2), spell=($3), content=($4)' + updateSound3 + updateSound4 + ' WHERE id=$5';
                                    pool.query(query_item2, [type2, separation2, spell2, content2, id2], function (err, result2) {
                                        if(err){
                                            return console.error('error running query', err);
                                        } else {
                                            // res.json(BaseResponse.SuccessResponse(result));
                                            console.log(result2);
                                        }
                                    });
                                } else {
                                    pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [req.params.id, separation2, spell2, type2, sound3,
                                        sound4, content2], function(err, result2) {
                                        if(err) {
                                            return console.error('error running query', err);
                                        } else {
                                            // res.json(BaseResponse.SuccessResponse(result));
                                            console.log(result2);
                                        }
                                        // res.json(BaseResponse.SuccessResponse(result));
                                        // console.log(result);
                                    });
                                }

                            } else {
                                return res.json(BaseResponse.SuccessResponse(result));
                            }
                            //update item 3
                            if(separation3){
                                var query_item3 = '';
                                var updateSound5 = '';
                                var updateSound6 = '';
                                if(sound5){
                                    updateSound5 = ', "sound1" = ' + "'" + sound5 + "'";
                                }
                                if(sound6){
                                    updateSound6 = ', "sound2" = ' + "'" + sound6 + "'";
                                }
                                if(id3){
                                    var query_item3 = 'UPDATE word_detail SET type = ($1), separation=($2), spell=($3), content=($4)' + updateSound5 + updateSound6 + ' WHERE id=$5';
                                    pool.query(query_item3, [type3, separation3, spell3, content3, id3], function (err, result3) {
                                        if(err){
                                            return console.error('error running query', err);
                                        } else {
                                            // res.json(BaseResponse.SuccessResponse(result));
                                            console.log(result3);
                                        }
                                    });
                                } else {
                                    pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [req.params.id, separation3, spell3, type3, sound5,
                                        sound6, content3], function(err, result3) {
                                        if(err) {
                                            return console.error('error running query', err);
                                        } else {
                                            // res.json(BaseResponse.SuccessResponse(result));
                                            console.log(result3);
                                        }
                                        // res.json(BaseResponse.SuccessResponse(result));
                                        // console.log(result);
                                    });

                                }

                            }else {
                                return res.json(BaseResponse.SuccessResponse(result));
                            }
                            //update item 4
                            if(separation4){
                                var query_item4 = '';
                                var updateSound7 = '';
                                var updateSound8 = '';
                                if(sound7){
                                    updateSound7 = ', "sound1" = ' + "'" + sound7 +"'";
                                }
                                if(sound8){
                                    updateSound8 = ', "sound2" = ' + "'" + sound8 +"'";
                                }
                                if(id4){
                                    var query_item4 = 'UPDATE word_detail SET type = ($1), separation=($2), spell=($3), content=($4)' + updateSound7 + updateSound8 + ' WHERE id=$5';
                                    pool.query(query_item4, [type4, separation4, spell4, content4, id4], function (err, result4) {
                                        if(err){
                                            return console.error('error running query', err);
                                        } else {
                                            // res.json(BaseResponse.SuccessResponse(result));
                                            console.log(result4);
                                        }
                                    });
                                } else {
                                    pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [req.params.id, separation4, spell4, type4, sound7,
                                        sound8, content4], function(err, result4) {
                                        if(err) {
                                            return console.error('error running query', err);
                                        } else {
                                            // res.json(BaseResponse.SuccessResponse(result));
                                            console.log(result4);
                                        }
                                        // res.json(BaseResponse.SuccessResponse(result));
                                        // console.log(result);
                                    });
                                }

                            } else {
                                return res.json(BaseResponse.SuccessResponse(result));
                            }
                            //update item 5
                            if(separation5){
                                var query_item5 = '';
                                var updateSound9 = '';
                                var updateSound10 = '';
                                if(sound9){
                                    updateSound9 = ', "sound1" = ' + "'" + sound9 + "'";
                                }
                                if(sound10){
                                    updateSound10 = ', "sound2" = ' + "'" + sound10 + "'";
                                }
                                if(id5){
                                    var query_item5 = 'UPDATE word_detail SET type = ($1), separation=($2), spell=($3), content=($4)' + updateSound9 + updateSound10 + ' WHERE id=$5';
                                    pool.query(query_item5, [type5, separation5, spell5, content5, id5], function (err, result5) {
                                        if(err){
                                            return console.error('error running query', err);
                                        } else {
                                            // res.json(BaseResponse.SuccessResponse(result));
                                            console.log(result5);
                                        }
                                    });
                                } else {
                                    pool.query('INSERT INTO word_detail(word_id, separation, spell, type, sound1, sound2, content) VALUES($1, $2, $3, $4, $5, $6, $7) ', [req.params.id, separation5, spell5, type5, sound9,
                                        sound10, content5], function(err, result5) {
                                        if(err) {
                                            return console.error('error running query', err);
                                        } else {
                                            // res.json(BaseResponse.SuccessResponse(result));
                                            console.log(result5);
                                        }
                                        // res.json(BaseResponse.SuccessResponse(result));
                                        // console.log(result);
                                    });

                                }

                            } else {
                                return res.json(BaseResponse.SuccessResponse(result));
                            }
                        }
                    });
                }
                // res.json(BaseResponse.SuccessResponse(result));
                // console.log(result);
            });


        }
        // res.json(BaseResponse.SuccessResponse(result.rows[0]));
        console.log(query1);
    });
});

//delete word
router.delete('/deleteWord', function (req, res) {
    var query = 'SELECT * FROM word WHERE id=' + req.body.id;
    pool.query( query , function(err, result) {
        if(err) {
            return console.error('error running query', err);
        } else if(result.rows.length>0){

            var query1 = 'UPDATE "word" SET "is_deleted" = ' + 1 + ' WHERE id=' + req.body.id;
            pool.query( query1 , function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                }
                res.json(BaseResponse.SuccessResponse());
                console.log(result);
            });


        }
        // res.json(BaseResponse.SuccessResponse(result.rows[0]));
        // console.log(query1);
    });
});

router.get('/getWordByText/:text', function (req, res) {
    var text = req.params.text;
    pool.query('SELECT * FROM word WHERE text=$1::varchar', [text], function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        else {
            res.json(BaseResponse.SuccessResponse(result.rows));
        }
    });
});

//search word
router.get('/searchWordByText/:text', function (req, res) {
    var text = req.params.text;
    pool.query('SELECT * FROM word WHERE text::varchar LIKE $1', [text+'%'], function(err, result) {
        if(err) {
            return console.error('error running query', err);
        }
        else {
            res.json(BaseResponse.SuccessResponse(result.rows));
        }
    });
});

function getWord(start, count, callback) {
    var query1 = 'SELECT * from word where is_deleted is null order by tansuat desc offset ' + start;
    if(count>0) {
        query1 = query1 + ' limit ' + count;
        pool.query(query1, function (err, result) {
            if (err) {
                res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
                return console.error('error running query', err);
            } else {
                callback(null, result);
            }
        });
    } else {
        pool.query(query1, function (err, result) {
            if (err) {
                res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
                return console.error('error running query', err);
            } else {
                callback(null, result);
            }
        });
    }
}
function getDetailWord(word, callback) {
    pool.query('select * from word_detail WHERE word_id=$1 and is_deleted IS NULL', [word['id']], function (err, result1) {
        if(err) {
            res.json(BaseResponse.FailResponse(4001, 'Can\'t get list words'));
            return console.error('error running query', err);
        } else {
            // callback(null, result1.rows);
            return result1.rows;
        }
    });
}

module.exports = router;