'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var inspectionCtrlStub = {
  index: 'inspectionCtrl.index',
  show: 'inspectionCtrl.show',
  create: 'inspectionCtrl.create',
  update: 'inspectionCtrl.update',
  destroy: 'inspectionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var inspectionIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './inspection.controller': inspectionCtrlStub
});

describe('Inspection API Router:', function() {

  it('should return an express router instance', function() {
    expect(inspectionIndex).to.equal(routerStub);
  });

  describe('GET /api/inspections', function() {

    it('should route to inspection.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'inspectionCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/inspections/:id', function() {

    it('should route to inspection.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'inspectionCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/inspections', function() {

    it('should route to inspection.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'inspectionCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/inspections/:id', function() {

    it('should route to inspection.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'inspectionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/inspections/:id', function() {

    it('should route to inspection.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'inspectionCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/inspections/:id', function() {

    it('should route to inspection.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'inspectionCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
