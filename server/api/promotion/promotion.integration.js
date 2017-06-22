'use strict';

var app = require('../..');
import request from 'supertest';

var newPromotion;

describe('Promotion API:', function() {

  describe('GET /api/promotions', function() {
    var promotions;

    beforeEach(function(done) {
      request(app)
        .get('/api/promotions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          promotions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(promotions).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/promotions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/promotions')
        .send({
          name: 'New Promotion',
          info: 'This is the brand new promotion!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPromotion = res.body;
          done();
        });
    });

    it('should respond with the newly created promotion', function() {
      expect(newPromotion.name).to.equal('New Promotion');
      expect(newPromotion.info).to.equal('This is the brand new promotion!!!');
    });

  });

  describe('GET /api/promotions/:id', function() {
    var promotion;

    beforeEach(function(done) {
      request(app)
        .get('/api/promotions/' + newPromotion._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          promotion = res.body;
          done();
        });
    });

    afterEach(function() {
      promotion = {};
    });

    it('should respond with the requested promotion', function() {
      expect(promotion.name).to.equal('New Promotion');
      expect(promotion.info).to.equal('This is the brand new promotion!!!');
    });

  });

  describe('PUT /api/promotions/:id', function() {
    var updatedPromotion;

    beforeEach(function(done) {
      request(app)
        .put('/api/promotions/' + newPromotion._id)
        .send({
          name: 'Updated Promotion',
          info: 'This is the updated promotion!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPromotion = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPromotion = {};
    });

    it('should respond with the updated promotion', function() {
      expect(updatedPromotion.name).to.equal('Updated Promotion');
      expect(updatedPromotion.info).to.equal('This is the updated promotion!!!');
    });

  });

  describe('DELETE /api/promotions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/promotions/' + newPromotion._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when promotion does not exist', function(done) {
      request(app)
        .delete('/api/promotions/' + newPromotion._id)
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
