/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/trackings              ->  index
 * POST    /api/trackings              ->  create
 * GET     /api/trackings/:id          ->  show
 * PUT     /api/trackings/:id          ->  update
 * DELETE  /api/trackings/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Tracking from './tracking.model';
import Review from '../review/review.model';

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

// Gets a list of Trackings
export function index(req, res) {
  return Tracking.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Tracking from the DB
export function show(req, res) {
  return Tracking.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Tracking in the DB
export function create(req, res) {
  return Tracking.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Tracking in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Tracking.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Tracking from the DB
export function destroy(req, res) {
  return Tracking.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Create Alerts on Tracking
export function fireAlert(req, res) {
  const reviewId = req.params.id;
  const source = req.body.source;
  const color = req.body.color || '#006df4';

  Review.findById(reviewId).exec()
    .then(handleEntityNotFound(res))
    .then(review => generateAlerts(review, source, color))
    .then((alerts) => {
      if (alerts.length) {
        persistAlerts(alerts)
      }
      return;
    })
    .then(() => res.status(200).send())
    .catch(handleError(res));
}

// Helper functions for creating Alerts

// Filter check items by value
function filterItemsByValue(result, value) {
  return _.chain(result.check)
    .reduce((base, check) => {
      return check.fields
        .map(field => ({
          category: check.category,
          comment: field.comment,
          name: field.name,
          value: field.value,
        }))
        .concat(base);
    }, [])
    .filter(item => item.value === value)
    .value();
}

// Generate the alert objects for a review
function generateAlerts(review, source, color) {
  const localId = review._id;
  const FAIL = 'FAIL';
  const vehicle = _.pick(review.vehicle, ['plate', 'localId']);
  const customer = Object.assign({}, review.customer);
  const currentStatus = { id: 1, name: 'PENDING' };
  const historyStatus = {
    id: 1,
    name: 'PENDING',
    color,
    user: source || {
      localId: '0001',
      name: 'MOBI LOOP',
    },
  };

  const failItems = filterItemsByValue(review.result, FAIL);
  const alerts = failItems.map(item => {
    const warning = {
      name: item.name,
      localId,
      color,
      type: 'VEHICLE_PART',
      periodicity: 0,
      nextReviewMileage: 0,
      nextReviewDate: 0,
      actualMileage: review.vehicle.mileage,
    };

    return {
      description: item.comment || null,
      color,
      vehicle,
      customer,
      currentStatus,
      historyStatus: [historyStatus],
      warning,
      provider: null,
    };
  });

  return alerts;
}

// Persist the alerts in the DB
function persistAlerts(alerts) {
  return Tracking.insertMany(alerts);
}
