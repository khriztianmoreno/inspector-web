'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var promotionCtrlStub = {
  index: 'promotionCtrl.index',
  show: 'promotionCtrl.show',
  create: 'promotionCtrl.create',
  update: 'promotionCtrl.update',
  destroy: 'promotionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var promotionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './promotion.controller': promotionCtrlStub
});

describe('Promotion API Router:', function() {

  it('should return an express router instance', function() {
    expect(promotionIndex).to.equal(routerStub);
  });

  describe('GET /api/promotions', function() {

    it('should route to promotion.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'promotionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/promotions/:id', function() {

    it('should route to promotion.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'promotionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/promotions', function() {

    it('should route to promotion.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'promotionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/promotions/:id', function() {

    it('should route to promotion.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'promotionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/promotions/:id', function() {

    it('should route to promotion.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'promotionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/promotions/:id', function() {

    it('should route to promotion.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'promotionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
