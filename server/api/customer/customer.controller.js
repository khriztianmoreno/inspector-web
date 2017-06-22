/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/customers              ->  index
 * GET     /api/customers/my           ->  myCustomers
 * GET     /myServices/:id             ->  myServices
 * GET     /api/customers/myAll        ->  myAllCustomers
 * GET     /api/customers/distributors ->  distributors
 * GET     /api/customers/providers    ->  providers
 * POST    /api/customers              ->  create
 * GET     /api/customers/:id          ->  show
 * PUT     /api/customers/:id          ->  update
 * DELETE  /api/customers/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Customer from './customer.model';
import * as service from './customer.service';

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
    console.log('Error customer server: ', err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Customers
export function index(req, res) {
  let query = service.filterByRole(req);
  return Customer.find(query).sort({ createdAt : -1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Gets my customers
 */
export function my(req, res) {
  let type    = req.params.type,
      localId = req.params.localId,
      query = service.myCustomers(type, localId);

  return Customer.find(query,{_id:1, name:1}).sort({ createdAt : -1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function distributors(req, res) {
  let query = service.getDistributors(req);

  return Customer.find(query).sort({ createdAt : -1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


export function myServices(req, res){
  const query = { channelId : req.params.id, "type.id": "2" };

  return Customer.find(query, { name: 1, services: 1, loc: 1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function headquartesByProviders(req, res){
  let query = { 'type.id': '2', channelId: req.params.id, active: true };

  return Customer.find(query).sort({ createdAt : -1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * List my providers
 */
export function providers(req, res){
  let query = service.getProviders(req);

  return Customer.find(query).sort({ createdAt : -1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


export function iamProvider(req, res, next){
  const query = service.iAmProvider(req);

  return Customer.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Gets my customers
 */
export function filterMyCustomers(req, res) {
  let type    = req.params.type,
      query = service.myFilterCustomers(req, type),
      fields = {_id:1, name:1, distributorName:1, distributorId:1, channelName:1, channelId:1};

  return Customer.find(query,fields).sort({ createdAt : -1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets all customers th currentUser
export function myAllCustomers(req, res) {
  let query = service.aggregateCustomers(req);
  return Customer.aggregate(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Customer from the DB
export function show(req, res) {
  return Customer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Customer in the DB
export function create(req, res) {
  return Customer.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Customer in the DB
export function update(req, res) {

  return Customer.findByIdAndUpdate({_id: req.body._id }, req.body, {upsert:true}).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));


  /*if (req.body._id) {
    delete req.body._id;
  }
  
  return Customer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));*/
}

// Deletes a Customer from the DB
export function destroy(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return Customer.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
