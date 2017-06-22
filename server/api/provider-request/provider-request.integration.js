'use strict';

var app = require('../..');
import request from 'supertest';

var newProviderRequest;

describe('ProviderRequest API:', function() {

  describe('GET /api/provider-requests', function() {
    var providerRequests;

    beforeEach(function(done) {
      request(app)
        .get('/api/provider-requests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          providerRequests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(providerRequests).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/provider-requests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/provider-requests')
        .send({
          name: 'New ProviderRequest',
          info: 'This is the brand new providerRequest!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProviderRequest = res.body;
          done();
        });
    });

    it('should respond with the newly created providerRequest', function() {
      expect(newProviderRequest.name).to.equal('New ProviderRequest');
      expect(newProviderRequest.info).to.equal('This is the brand new providerRequest!!!');
    });

  });

  describe('GET /api/provider-requests/:id', function() {
    var providerRequest;

    beforeEach(function(done) {
      request(app)
        .get('/api/provider-requests/' + newProviderRequest._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          providerRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      providerRequest = {};
    });

    it('should respond with the requested providerRequest', function() {
      expect(providerRequest.name).to.equal('New ProviderRequest');
      expect(providerRequest.info).to.equal('This is the brand new providerRequest!!!');
    });

  });

  describe('PUT /api/provider-requests/:id', function() {
    var updatedProviderRequest;

    beforeEach(function(done) {
      request(app)
        .put('/api/provider-requests/' + newProviderRequest._id)
        .send({
          name: 'Updated ProviderRequest',
          info: 'This is the updated providerRequest!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProviderRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProviderRequest = {};
    });

    it('should respond with the updated providerRequest', function() {
      expect(updatedProviderRequest.name).to.equal('Updated ProviderRequest');
      expect(updatedProviderRequest.info).to.equal('This is the updated providerRequest!!!');
    });

  });

  describe('DELETE /api/provider-requests/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/provider-requests/' + newProviderRequest._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when providerRequest does not exist', function(done) {
      request(app)
        .delete('/api/provider-requests/' + newProviderRequest._id)
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
