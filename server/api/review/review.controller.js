/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/reviews              ->  index
 * GET     /api/reviews/dashboard    ->  dashBoard
 * GET     /api/reviews/totalByDays  ->  totalByDays
 * POST    /api/reviews              ->  create
 * GET     /api/reviews/:id          ->  show
 * PUT     /api/reviews/:id          ->  update
 * DELETE  /api/reviews/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Review from './review.model';
import * as service from './review.service';

const mileageSnapshots = require('./../mileageSnapshot/mileageSnapshot.controller');

//const service = require('./review.service');
const Promise = require('bluebird');


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
    console.log('Error: ', err);
    res.status(statusCode).send(err);
  };
}

function updateMileage(updates) {
  let snapshot = {
    localId: updates.vehicle.localId,
    plate: updates.vehicle.plate,
    vehicleClass: updates.vehicle.class,
    actualMileage: updates.vehicle.mileage,
    customer: updates.customer
  };
  
  return function(entity) {
    return mileageSnapshots.createFromReview(snapshot);
  };
}

// Gets a list of Reviews
export function index(req, res) {
  let query = service.myReviews(req),
      fields = {
        '_id':1,
        'createdAt':1,
        'customer.localName':1,
        'type':1,
        'userReview.name': 1,
        'vehicle.plate': 1,
      };

  return Review.find(query, fields)
    .sort({ createdAt : -1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Reviews
export function dashBoard(req, res) {
  let query = service.generalDashboard(req);

  let promises ={
    countMonthly  : Review.aggregate(query.countMonthly).exec(),
    countToday    : Review.count(query.countToday).exec(),
    costMonthly   : Review.aggregate(query.costMonthly).exec(),
    costToday     : Review.aggregate(query.costToday).exec()
  }

  return Promise
    .props(promises)
    .then(function (data) {

      let result ={
        countMonthly  : data.countMonthly.length > 0 ? data.countMonthly[0].reviews : 0,
        countToday    : data.countToday || 0,
        costMonthly   : data.costMonthly.length > 0 ? data.costMonthly[0].value : 0,
        costToday     : data.costToday.length > 0 ? data.costToday[0].value : 0
      }
      res.status(200).json(result);
    })
    .catch(handleError(res));


}

// Get a list total reviews by last 15 days
export function totalByDays(req, res){
  let query = service.totalReviewsByDays(req);

  return Review.aggregate(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Review from the DB
export function show(req, res) {
  return Review.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Review in the DB
export function create(req, res) {
  return Review.create(req.body)
    .then(respondWithResult(res, 201))
    .then(updateMileage(req.body, res))
    .catch(handleError(res));
}

// Updates an existing Review in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Review.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Review from the DB
export function destroy(req, res) {
  return Review.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function report(req, res, next){
  let query = service.reportQuery(req);

  return Review.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
