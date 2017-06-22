/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/mileageSnapshots              ->  index
 * POST    /api/mileageSnapshots              ->  create
 * GET     /api/mileageSnapshots/:id          ->  show
 * PUT     /api/mileageSnapshots/:id          ->  update
 * DELETE  /api/mileageSnapshots/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import MileageSnapshot from './mileageSnapshot.model';

const service = require('./mileageSnapshot.service');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of MileageSnapshots
export function index(req, res) {
  return MileageSnapshot.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single MileageSnapshot from the DB
export function show(req, res) {
  return MileageSnapshot.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new MileageSnapshot in the DB
export function create(req, res) {

  return service.averageMileageDay(req)
    .then((result)=>{
      if (result !== null) {
        req.body.previousMileage = result.previousMileage;
        req.body.averageMileageDay =  result.averageMileageDay;
        req.body.daysSinceLastUpdate = result.daysSinceLastUpdate;
      }

      return MileageSnapshot.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
    })
    .catch((err) => {
      console.log('Error', err);
    })
}

// Creates a new MileageSnapshot in the DB From Review API
export function createFromReview(req, res) {

  return service.averageMileageDay(req)
    .then((result)=>{
      if (result !== null) {
        req.previousMileage = result.previousMileage;
        req.averageMileageDay =  result.averageMileageDay;
        req.daysSinceLastUpdate = result.daysSinceLastUpdate;
      }

      console.log('ResultaverageMileageDay : ', result);

      return MileageSnapshot.create(req)
        .then((res) => {
          console.log('Resultado: ', res);
        })
        .catch((err) => {
          console.log('Error', err);
        });
    })
    .catch((err) => {
      console.log('Error', err);
    })
}


// Updates an existing MileageSnapshot in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return MileageSnapshot.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a MileageSnapshot from the DB
export function destroy(req, res) {
  return MileageSnapshot.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
