var express = require('express');
var router = express.Router();
var axios = require('axios').default;

/* GET home page. */
router.get('/carbonemission/:kms/:vtype/:fueltype', function(req, res, next) {
    switch(req.params.vtype){
        case 'Little':
            var conso = 5;
            break;
        case 'Medium':
            conso = 7
            break;
        case 'Big':
            conso = 9
            break;
    }
    switch(req.params.fueltype){
        case 'diesel':
            var emission = (req.params.kms/1000000) * conso * 2640;
            break;
        case 'essence':
            emission = (req.params.kms/1000000) * conso * 2392;
            break;
        case 'gpl':
            emission = (req.params.kms/1000000) * conso * 1665;
            break;
        case 'cng':
            emission = (req.params.kms/1000000) * conso * 1819;
            break;
    }
    res.json(emission)
});

module.exports = router;
