'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var trackingCtrlStub = {
  index: 'trackingCtrl.index',
  show: 'trackingCtrl.show',
  create: 'trackingCtrl.create',
  update: 'trackingCtrl.update',
  destroy: 'trackingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var trackingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tracking.controller': trackingCtrlStub
});

describe('Tracking API Router:', function() {

  it('should return an express router instance', function() {
    expect(trackingIndex).to.equal(routerStub);
  });

  describe('GET /api/trackings', function() {

    it('should route to tracking.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'trackingCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/trackings/:id', function() {

    it('should route to tracking.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'trackingCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/trackings', function() {

    it('should route to tracking.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'trackingCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/trackings/:id', function() {

    it('should route to tracking.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'trackingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/trackings/:id', function() {

    it('should route to tracking.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'trackingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/trackings/:id', function() {

    it('should route to tracking.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'trackingCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
