'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var systemvalueCtrlStub = {
  index: 'systemvalueCtrl.index',
  show: 'systemvalueCtrl.show',
  create: 'systemvalueCtrl.create',
  update: 'systemvalueCtrl.update',
  destroy: 'systemvalueCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var systemvalueIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './systemvalue.controller': systemvalueCtrlStub
});

describe('Systemvalue API Router:', function() {

  it('should return an express router instance', function() {
    expect(systemvalueIndex).to.equal(routerStub);
  });

  describe('GET /api/systemvalues', function() {

    it('should route to systemvalue.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'systemvalueCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/systemvalues/:id', function() {

    it('should route to systemvalue.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'systemvalueCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/systemvalues', function() {

    it('should route to systemvalue.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'systemvalueCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/systemvalues/:id', function() {

    it('should route to systemvalue.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'systemvalueCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/systemvalues/:id', function() {

    it('should route to systemvalue.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'systemvalueCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/systemvalues/:id', function() {

    it('should route to systemvalue.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'systemvalueCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
