/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/systemvalues              ->  index
 * POST    /api/systemvalues              ->  create
 * GET     /api/systemvalues/:group          ->  show
 * PUT     /api/systemvalues/:id          ->  update
 * DELETE  /api/systemvalues/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Systemvalue from './systemvalue.model';

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

// Gets a list of Systemvalues
export function index(req, res) {
  return Systemvalue.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Systemvalue from the DB
export function show(req, res) {
  return Systemvalue.find({ 'group' : req.params.group}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Systemvalue in the DB
export function create(req, res) {
  return Systemvalue.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Systemvalue in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Systemvalue.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Systemvalue from the DB
export function destroy(req, res) {
  return Systemvalue.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
