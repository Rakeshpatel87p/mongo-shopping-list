var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = "test";
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        seed.run(function() {
            done();
        });
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });

    it('should list items on get', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad Beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });
    it('should add an item on post', function(done) {
        chai.request(app)
            .post('/items')
            .send({ 'name': 'Kale' })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body.name.should.equal('Kale');
                done();
            })
    });

    it('should edit an item on put', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(error, response) {
                chai.request(app)
                    .put('/items/' + response.body[0]._id)
                    .send({ 'name': 'heather', 'id': response.body[0]._id })
                    .end(function(err, res) {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('name');
                        res.body.name.should.be.a('string');
                        chai.request(app)
                            .get('/items/' + response.body[0]._id)
                            .end(function(errors, responses) {
                                responses.body.name.should.equal('heather');
                                responses.body._id.should.equal(response.body[0]._id);
                                done();
                            })

                    });
            })

    });

    it('should delete the desired item', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(error, response) {
                chai.request(app)
                	// Why is it returning a 400 error?
                    .delete('/items/' + response.body[0]._id)
                    .end(function(err, res) {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message', 'successfully deleted', 'status', 'ok');
                        chai.request(app)
                            .get('/items')
                            .end(function(newErrors, newResponses) {
                                newResponses.body[0].name.should.equal('Tomatoes');
                                newResponses.body[0].should.be.a('object');
                                newResponses.body[1].name.should.equal('Peppers');
                                newResponses.body[0].should.be.a('object');
                                newResponses.body[2].name.should.equal('Kale');
                                newResponses.body.should.have.length(3);
                                done();
                            })

                    })

            });
    });
});
