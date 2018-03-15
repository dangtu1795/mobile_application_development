var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/distance', function (req, res) {
    let {lat1, lat2, long1, long2} = req.query;
    console.log(lat1, lat2, long1, long2);

    var R = 6371; // Radius of the earth in km
    var dLat = (lat2-lat1)* (Math.PI/180);  // deg2rad below
    var dlong = (long2-long1)* (Math.PI/180);
    var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos((lat1)* (Math.PI/180)) * Math.cos((lat2)* (Math.PI/180)) *
            Math.sin(dlong/2) * Math.sin(dlong/2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    res.send({
        data: d+' km'
    })
});

module.exports = router;
