var express = require('express');
var router = express.Router();
var axios = require('axios').default;

/**
 * Method to calculate the carbon emission based on vehicule params.
 */
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
        case 'Diesel':
            var emission = (req.params.kms/1000000) * conso * 2640;
            break;
        case 'Essence':
            emission = (req.params.kms/1000000) * conso * 2392;
            break;
        case 'GPL':
            emission = (req.params.kms/1000000) * conso * 1665;
            break;
        case 'CNG':
            emission = (req.params.kms/1000000) * conso * 1819;
            break;
    }
    res.json(emission)
});

module.exports = router;
