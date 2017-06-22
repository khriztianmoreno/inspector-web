/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vehicles                ->  index
 * GET     /api/vehicles/plate/:plate   ->  plate
 * GET     /api/vehicles/search/:filter ->  find
 * POST    /api/vehicles                ->  create
 * GET     /api/vehicles/:id            ->  show
 * PUT     /api/vehicles/:id            ->  update
 * DELETE  /api/vehicles/:id            ->  destroy
 */

'use strict';

import _ from 'lodash';
import Vehicle from './vehicle.model';
import * as service from './vehicle.service';

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
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Vehicles
/*export function index(req, res) {
  let limit = parseInt(req.params.limit),
      page = parseInt(req.params.page);

  return Vehicle.find()
    .skip(limit * (page - 1))
    .limit(limit)
    .exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}*/

export function index(req, res) {
  let limit = parseInt(req.params.limit),
      page = parseInt(req.params.page),
      query = service.myVehicles(req);

  return Vehicle.paginate(query, {
      page: page,
      limit: limit,
      sort: { createdAt: -1 } 
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Vehicle from the DB
export function plate(req, res) {
  //TODO: Buscar vehiculos unicamente asociados al usuario
  let plate = req.params.plate,
      query = { 'plate.number': { $regex: plate, $options: 'i' } };

  return Vehicle.find(query).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Gets a list of Reviews
export function dashBoardFleet(req, res) {
  let query = service.fleetBoard(req);

  let promises ={
    completed  : Vehicle.aggregate(query.completed).exec(),
    unfinished : Vehicle.aggregate(query.unfinished).exec(),
    fleet      : Vehicle.aggregate(query.fleet).exec(),
    vehicles   : Vehicle.count(query.vehicles).exec()
  }

  return Promise
    .props(promises)
    .then(function (data) {

      let result ={
        completed  : data.completed.length,
        unfinished : data.unfinished.length,
        fleet      : data.fleet.length,
        vehicles   : data.vehicles
      }
      res.status(200).json(result);
    })
    .catch(handleError(res));


}

// Gets a single Vehicle from the DB
export function show(req, res) {
  return Vehicle.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function find(req, res){
  let filter = req.params.filter;
  let query = service.getTextFilter(filter);
  return Vehicle.find(query).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Vehicle in the DB
export function create(req, res) {
  return Vehicle.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Vehicle in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Vehicle.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Vehicle from the DB
export function destroy(req, res) {
  return Vehicle.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
