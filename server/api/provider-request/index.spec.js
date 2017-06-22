'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var providerRequestCtrlStub = {
  index: 'providerRequestCtrl.index',
  show: 'providerRequestCtrl.show',
  create: 'providerRequestCtrl.create',
  update: 'providerRequestCtrl.update',
  destroy: 'providerRequestCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var providerRequestIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './provider-request.controller': providerRequestCtrlStub
});

describe('ProviderRequest API Router:', function() {

  it('should return an express router instance', function() {
    expect(providerRequestIndex).to.equal(routerStub);
  });

  describe('GET /api/provider-requests', function() {

    it('should route to providerRequest.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'providerRequestCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/provider-requests/:id', function() {

    it('should route to providerRequest.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'providerRequestCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/provider-requests', function() {

    it('should route to providerRequest.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'providerRequestCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/provider-requests/:id', function() {

    it('should route to providerRequest.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'providerRequestCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/provider-requests/:id', function() {

    it('should route to providerRequest.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'providerRequestCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/provider-requests/:id', function() {

    it('should route to providerRequest.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'providerRequestCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
