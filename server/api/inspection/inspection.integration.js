'use strict';

var app = require('../..');
import request from 'supertest';

var newInspection;

describe('Inspection API:', function() {

  describe('GET /api/inspections', function() {
    var inspections;

    beforeEach(function(done) {
      request(app)
        .get('/api/inspections')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          inspections = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(inspections).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/inspections', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/inspections')
        .send({
          name: 'New Inspection',
          info: 'This is the brand new inspection!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newInspection = res.body;
          done();
        });
    });

    it('should respond with the newly created inspection', function() {
      expect(newInspection.name).to.equal('New Inspection');
      expect(newInspection.info).to.equal('This is the brand new inspection!!!');
    });

  });

  describe('GET /api/inspections/:id', function() {
    var inspection;

    beforeEach(function(done) {
      request(app)
        .get('/api/inspections/' + newInspection._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          inspection = res.body;
          done();
        });
    });

    afterEach(function() {
      inspection = {};
    });

    it('should respond with the requested inspection', function() {
      expect(inspection.name).to.equal('New Inspection');
      expect(inspection.info).to.equal('This is the brand new inspection!!!');
    });

  });

  describe('PUT /api/inspections/:id', function() {
    var updatedInspection;

    beforeEach(function(done) {
      request(app)
        .put('/api/inspections/' + newInspection._id)
        .send({
          name: 'Updated Inspection',
          info: 'This is the updated inspection!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedInspection = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInspection = {};
    });

    it('should respond with the updated inspection', function() {
      expect(updatedInspection.name).to.equal('Updated Inspection');
      expect(updatedInspection.info).to.equal('This is the updated inspection!!!');
    });

  });

  describe('DELETE /api/inspections/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/inspections/' + newInspection._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when inspection does not exist', function(done) {
      request(app)
        .delete('/api/inspections/' + newInspection._id)
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
