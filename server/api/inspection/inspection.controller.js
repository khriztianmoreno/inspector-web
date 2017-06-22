/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/inspections              ->  index
 * POST    /api/inspections              ->  create
 * GET     /api/inspections/:id          ->  show
 * PUT     /api/inspections/:id          ->  update
 * DELETE  /api/inspections/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Inspection from './inspection.model';
import * as service from './inspection.service';

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
    //console.log(JSON.stringify(updated));
    return updated.save()
      .then(updated => {
        console.log(JSON.stringify(updated));
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

// Gets a list of Inspections
export function index(req, res) {
  let query = service.myInspections(req);

  return Inspection.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Inspection from the DB
export function show(req, res) {
  console.log(req.params.id);
  return Inspection.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Inspection in the DB
export function create(req, res) {
  return Inspection.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Inspection in the DB
export function update(req, res) {
  /*if (req.body._id) {
    delete req.body._id;
  }*/

  return Inspection.update({_id: req.body._id }, req.body).exec()
    .then(respondWithResult(res, 201))
    .catch(handleError(res));

  /*return Inspection.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));*/
}

// Deletes a Inspection from the DB
export function destroy(req, res) {
  return Inspection.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
