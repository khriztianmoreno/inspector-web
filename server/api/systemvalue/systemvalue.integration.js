'use strict';

var app = require('../..');
import request from 'supertest';

var newSystemvalue;

describe('Systemvalue API:', function() {

  describe('GET /api/systemvalues', function() {
    var systemvalues;

    beforeEach(function(done) {
      request(app)
        .get('/api/systemvalues')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          systemvalues = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(systemvalues).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/systemvalues', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/systemvalues')
        .send({
          name: 'New Systemvalue',
          info: 'This is the brand new systemvalue!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSystemvalue = res.body;
          done();
        });
    });

    it('should respond with the newly created systemvalue', function() {
      expect(newSystemvalue.name).to.equal('New Systemvalue');
      expect(newSystemvalue.info).to.equal('This is the brand new systemvalue!!!');
    });

  });

  describe('GET /api/systemvalues/:id', function() {
    var systemvalue;

    beforeEach(function(done) {
      request(app)
        .get('/api/systemvalues/' + newSystemvalue._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          systemvalue = res.body;
          done();
        });
    });

    afterEach(function() {
      systemvalue = {};
    });

    it('should respond with the requested systemvalue', function() {
      expect(systemvalue.name).to.equal('New Systemvalue');
      expect(systemvalue.info).to.equal('This is the brand new systemvalue!!!');
    });

  });

  describe('PUT /api/systemvalues/:id', function() {
    var updatedSystemvalue;

    beforeEach(function(done) {
      request(app)
        .put('/api/systemvalues/' + newSystemvalue._id)
        .send({
          name: 'Updated Systemvalue',
          info: 'This is the updated systemvalue!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSystemvalue = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSystemvalue = {};
    });

    it('should respond with the updated systemvalue', function() {
      expect(updatedSystemvalue.name).to.equal('Updated Systemvalue');
      expect(updatedSystemvalue.info).to.equal('This is the updated systemvalue!!!');
    });

  });

  describe('DELETE /api/systemvalues/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/systemvalues/' + newSystemvalue._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when systemvalue does not exist', function(done) {
      request(app)
        .delete('/api/systemvalues/' + newSystemvalue._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
