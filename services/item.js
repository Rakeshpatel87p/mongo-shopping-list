var Item = require('../models/item');

exports.save = function(name, callback, errback) {
    Item.create({ name: name }, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        callback(item);
    });
};

exports.list = function(callback, errback) {
    Item.find(function(err, items) {
        if (err) {
            errback(err);
            return;
        }
        callback(items);
    });
};

exports.getItem = function(_id, callback, errback) {
    Item.findOne({ _id: _id }, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        callback(item);
    });
};

exports.edit = function(_id, name, callback, errback) {
    query = { _id: _id }
    Item.findOneAndUpdate(query, { name: name }, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        Item.findOne({ _id: _id }, function(err, _item) {
                if (err) {
                    errback(err);
                    return;
                }
                callback(item);
            })
    });
};

exports.remove = function(_id, callback, errback){
    Item.remove({_id: _id}, function(err, item){
        if (err){
            errback(err);
            return
        }
        callback(item);
    })
}
