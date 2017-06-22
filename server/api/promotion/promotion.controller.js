/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/promotions              ->  index
 * POST    /api/promotions              ->  create
 * GET     /api/promotions/:id          ->  show
 * PUT     /api/promotions/:id          ->  update
 * DELETE  /api/promotions/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Promotion from './promotion.model';
import * as service from './promotion.service';

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

// Gets a list of Promotions
export function index(req, res) {
  const query = service.myPromotions(req);

  return Promotion.find(query).sort({ createdAt : -1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Promotion from the DB
export function show(req, res) {
  return Promotion.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Promotion in the DB
export function create(req, res) {
  return Promotion.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Promotion in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Promotion.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Promotion from the DB
export function destroy(req, res) {
  return Promotion.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
