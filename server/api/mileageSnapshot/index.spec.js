'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mileageSnapshotCtrlStub = {
  index: 'mileageSnapshotCtrl.index',
  show: 'mileageSnapshotCtrl.show',
  create: 'mileageSnapshotCtrl.create',
  update: 'mileageSnapshotCtrl.update',
  destroy: 'mileageSnapshotCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mileageSnapshotIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './mileageSnapshot.controller': mileageSnapshotCtrlStub
});

describe('MileageSnapshot API Router:', function() {

  it('should return an express router instance', function() {
    expect(mileageSnapshotIndex).to.equal(routerStub);
  });

  describe('GET /api/mileageSnapshots', function() {

    it('should route to mileageSnapshot.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'mileageSnapshotCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/mileageSnapshots/:id', function() {

    it('should route to mileageSnapshot.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'mileageSnapshotCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/mileageSnapshots', function() {

    it('should route to mileageSnapshot.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'mileageSnapshotCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/mileageSnapshots/:id', function() {

    it('should route to mileageSnapshot.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'mileageSnapshotCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mileageSnapshots/:id', function() {

    it('should route to mileageSnapshot.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'mileageSnapshotCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mileageSnapshots/:id', function() {

    it('should route to mileageSnapshot.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'mileageSnapshotCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
