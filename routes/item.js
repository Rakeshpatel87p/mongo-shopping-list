var express = require('express');
var Item = require('../services/item');
var router = express.Router();

router.get('/items', function(req, res){
	Item.list(function(items){
		res.json(items);
	}, function(err){
		res.status(400).json(err);
	});
});

router.post('/items', function(req, res){
	Item.save(req.body.name, function(item){
		res.status(201).json(item);
	}, function(err){
		res.status(400).json(err);
	});
});

router.put('/items/:id', function(req, res){
	var _id = req.params.id;
	Item.edit(_id, req.body.name, function(item){
		res.status(201).json(item);
	}, function(err){
		res.status(400).json(err);
	});
});

// var findObject = function(id) {
//     for (var i = 0; i < items.length; i++) {
//         if (items[i].id == id) {
//             return i
//         }
//     }
//     return -1

// What is this doing?
module.exports = router;