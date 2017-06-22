'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var warningCtrlStub = {
  index: 'warningCtrl.index',
  show: 'warningCtrl.show',
  create: 'warningCtrl.create',
  update: 'warningCtrl.update',
  destroy: 'warningCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var warningIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './warning.controller': warningCtrlStub
});

describe('Warning API Router:', function() {

  it('should return an express router instance', function() {
    expect(warningIndex).to.equal(routerStub);
  });

  describe('GET /api/warnings', function() {

    it('should route to warning.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'warningCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/warnings/:id', function() {

    it('should route to warning.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'warningCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/warnings', function() {

    it('should route to warning.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'warningCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/warnings/:id', function() {

    it('should route to warning.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'warningCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/warnings/:id', function() {

    it('should route to warning.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'warningCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/warnings/:id', function() {

    it('should route to warning.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'warningCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
