var express = require('express');
var Item = require('../services/item');
var router = express.Router();

router.get('/items', function(req, res) {
    Item.list(function(items) {
        res.json(items);
    }, function(err) {
        res.status(400).json(err);
    });
});

router.get('/items/:id', function(req, res) {
    var _id = req.params.id;
    Item.getItem(_id,
        function(item) {
            res.status(201).json(item);
        },
        function(err) {
            res.status(400).json(err);
        });
});

router.post('/items', function(req, res) {
    Item.save(req.body.name,

        function(item) {
            res.status(201).json(item);
        },

        function(err) {
            res.status(400).json(err);
        }


    );
});

router.put('/items/:id', function(req, res) {
    var _id = req.params.id;

    Item.edit(_id, req.body.name, function(item) {
        res.status(201).json(item);
    }, function(err) {
        res.status(400).json(err);
    });
});

router.delete('/items/:id', function(req, res) {
    var _id = req.params.id;
    Item.remove(_id,
        function(item) {
            res.status(201).json({message: 'successfully deleted', status: 'ok'});
        },
        function(err) {
            res.status(400).json(err);
        });
});


// What is this doing?
// converts the file into a library
// this will allow it to be required!!
// var someLib = require('some-lib');
// e.g var Item = require('./routes/item.js');
// e.g var Item = require('./routes/item');
module.exports = router;
