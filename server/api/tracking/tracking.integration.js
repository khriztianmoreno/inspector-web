'use strict';

var app = require('../..');
import request from 'supertest';

var newTracking;

describe('Tracking API:', function() {

  describe('GET /api/trackings', function() {
    var trackings;

    beforeEach(function(done) {
      request(app)
        .get('/api/trackings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          trackings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(trackings).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/trackings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/trackings')
        .send({
          name: 'New Tracking',
          info: 'This is the brand new tracking!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTracking = res.body;
          done();
        });
    });

    it('should respond with the newly created tracking', function() {
      expect(newTracking.name).to.equal('New Tracking');
      expect(newTracking.info).to.equal('This is the brand new tracking!!!');
    });

  });

  describe('GET /api/trackings/:id', function() {
    var tracking;

    beforeEach(function(done) {
      request(app)
        .get('/api/trackings/' + newTracking._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          tracking = res.body;
          done();
        });
    });

    afterEach(function() {
      tracking = {};
    });

    it('should respond with the requested tracking', function() {
      expect(tracking.name).to.equal('New Tracking');
      expect(tracking.info).to.equal('This is the brand new tracking!!!');
    });

  });

  describe('PUT /api/trackings/:id', function() {
    var updatedTracking;

    beforeEach(function(done) {
      request(app)
        .put('/api/trackings/' + newTracking._id)
        .send({
          name: 'Updated Tracking',
          info: 'This is the updated tracking!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTracking = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTracking = {};
    });

    it('should respond with the updated tracking', function() {
      expect(updatedTracking.name).to.equal('Updated Tracking');
      expect(updatedTracking.info).to.equal('This is the updated tracking!!!');
    });

  });

  describe('DELETE /api/trackings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/trackings/' + newTracking._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tracking does not exist', function(done) {
      request(app)
        .delete('/api/trackings/' + newTracking._id)
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
