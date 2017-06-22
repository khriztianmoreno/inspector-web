'use strict';

var app = require('../..');
import request from 'supertest';

var newMileageSnapshot;

describe('MileageSnapshot API:', function() {

  describe('GET /api/mileageSnapshots', function() {
    var mileageSnapshots;

    beforeEach(function(done) {
      request(app)
        .get('/api/mileageSnapshots')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mileageSnapshots = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(mileageSnapshots).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/mileageSnapshots', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mileageSnapshots')
        .send({
          name: 'New MileageSnapshot',
          info: 'This is the brand new mileageSnapshot!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMileageSnapshot = res.body;
          done();
        });
    });

    it('should respond with the newly created mileageSnapshot', function() {
      expect(newMileageSnapshot.name).to.equal('New MileageSnapshot');
      expect(newMileageSnapshot.info).to.equal('This is the brand new mileageSnapshot!!!');
    });

  });

  describe('GET /api/mileageSnapshots/:id', function() {
    var mileageSnapshot;

    beforeEach(function(done) {
      request(app)
        .get('/api/mileageSnapshots/' + newMileageSnapshot._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mileageSnapshot = res.body;
          done();
        });
    });

    afterEach(function() {
      mileageSnapshot = {};
    });

    it('should respond with the requested mileageSnapshot', function() {
      expect(mileageSnapshot.name).to.equal('New MileageSnapshot');
      expect(mileageSnapshot.info).to.equal('This is the brand new mileageSnapshot!!!');
    });

  });

  describe('PUT /api/mileageSnapshots/:id', function() {
    var updatedMileageSnapshot;

    beforeEach(function(done) {
      request(app)
        .put('/api/mileageSnapshots/' + newMileageSnapshot._id)
        .send({
          name: 'Updated MileageSnapshot',
          info: 'This is the updated mileageSnapshot!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMileageSnapshot = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMileageSnapshot = {};
    });

    it('should respond with the updated mileageSnapshot', function() {
      expect(updatedMileageSnapshot.name).to.equal('Updated MileageSnapshot');
      expect(updatedMileageSnapshot.info).to.equal('This is the updated mileageSnapshot!!!');
    });

  });

  describe('DELETE /api/mileageSnapshots/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/mileageSnapshots/' + newMileageSnapshot._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when mileageSnapshot does not exist', function(done) {
      request(app)
        .delete('/api/mileageSnapshots/' + newMileageSnapshot._id)
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
