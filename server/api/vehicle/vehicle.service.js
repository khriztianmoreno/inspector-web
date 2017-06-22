'use strict';

import _ from 'lodash';
import { decodedToken } from './../../auth/auth.service';

const DATA_QUERY = {
  'admin': function(){
    return '{}'; //SAPCO puede ver todos
  },
  'cda': function(user){
    return {'customer.channelId': user.customer.localId };
  },
  'sede': function(user){
    return {'customer.distributorId': user.customer.localId };
  },
  'flota': function(user){
    return { 'customer.localId': user.customer.localId };
  },
  'tecnico': function(user){
    //Los vehiculos de todo el cda
    return { 'customer.channelId': user.customer.channelId };
  },
  'default': function(){
    return {};
  }
};

export function getTextFilter(filter) {
  if (filter) {
    var text = filter;
    return {
      $or: [{
        'plate.number': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'vehicleData.brand': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'vehicleData.motor': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'vehicleData.serie': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'vehicleData.bodyWork': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'vehicleData.service': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'vehicleData.class': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'vehicleData.chassis': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'vehicleData.vin': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'vehicleData.owner.fullName': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'customer.localName': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'customer.channelName': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'customer.distributorName': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'documents.type': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'documents.diagnosticsCenter': {
          $regex: text,
          $options: 'i'
        }
      },
      {
        'documents.insuranceCompany': {
          $regex: text,
          $options: 'i'
        }
      }]
    };
  } else {
    return {};
  }
}

export function myVehicles(req) {
  //Se obtiene el token req.headers.authorization
  //Utilizamos solo la parte del token
  let user = currentUserFromToken(req);
  return DATA_QUERY[user.role](user) || DATA_QUERY['default']() ;
}

export function fleetBoard(req){
  let user = currentUserFromToken(req),
      d = new Date(), monthQuery = d.getMonth() + 1;

  let query = {
    completed   : QUERY_COMPLETED_REVIEWS[user.role](user.customer, monthQuery),
    unfinished  : QUERY_UNFINISHED_REVIEWS[user.role](user,monthQuery),
    fleet       : QUERY_TOTAL_FLEETS[user.role](user.customer),
    vehicles    : QUERY_TOTAL_VEHICLES[user.role](user.customer)
  };

  return query ;
}


/**
 * Get user from token
 */
function currentUserFromToken(req) {
  return decodedToken(req.headers.authorization.split('Bearer ')[1]);
}



const QUERY_COMPLETED_REVIEWS = {
    'admin': function(customer, monthQuery){
      return [
        { $project: {_id: 1, 'reviews.date': 1}},
        { $unwind : "$reviews" },
        {
            $group : {
              _id: {
                  "month" : { "$month" : "$reviews.date"},
                  "id": "$_id"
              }
            }
        },
        { $match :  {'_id.month': monthQuery} }
      ];
    },
    'cda': function(customer, monthQuery){
      return [
        { $project: {_id: 1, 'reviews.date': 1, 'customer.channelId': 1}},
        { $unwind : "$reviews" },
        { $match :  {'customer.channelId': customer.localId} },
        {
            $group : {
              _id: {
                  "month" : { "$month" : "$reviews.date"},
                  "id": "$_id"
              }
            }
        },
        { $match :  {'_id.month': monthQuery} }
      ];
    },
    'sede': function(customer, monthQuery){
      return [
        { $project: {_id: 1, 'reviews.date': 1, 'customer.distributorlId': 1}},
        { $unwind : "$reviews" },
        { $match :  {'customer.distributorlId': customer.localId} },
        {
            $group : {
              _id: {
                  "month" : { "$month" : "$reviews.date"},
                  "id": "$_id"
              }
            }
        },
        { $match :  {'_id.month': monthQuery} }
      ];
    },
    'flota':function(customer, monthQuery){
      return [
        { $project: {_id: 1, 'reviews.date': 1, 'customer.localId': 1}},
        { $unwind : "$reviews" },
        { $match :  {'customer.localId': customer.localId} },
        {
            $group : {
              _id: {
                  "month" : { "$month" : "$reviews.date"},
                  "id": "$_id"
              }
            }
        },
        { $match :  {'_id.month': monthQuery} }
      ];
    }
};

const QUERY_UNFINISHED_REVIEWS = {
    'admin': function(customer, monthQuery){
      return [
        { $project: {_id: 1, 'reviews.date': 1}},
        { $unwind : "$reviews" },
        {
            $group : {
              _id: {
                  "month" : { "$month" : "$reviews.date"},
                  "id": "$_id"
              }
            }
        },
        { $match :  {'_id.month': monthQuery} }
      ];
    },
    'cda': function(customer, monthQuery){
      return [
        { $project: {_id: 1, 'reviews.date': 1, 'customer.channelId': 1}},
        { $unwind : "$reviews" },
        { $match :  {'customer.channelId': customer.localId} },
        {
            $group : {
              _id: {
                  "month" : { "$month" : "$reviews.date"},
                  "id": "$_id"
              }
            }
        },
        { $match :  {'_id.month': monthQuery} }
      ];
    },
    'sede': function(customer, monthQuery){
      return [
        { $project: {_id: 1, 'reviews.date': 1, 'customer.distributorlId': 1}},
        { $unwind : "$reviews" },
        { $match :  {'customer.distributorlId': customer.localId} },
        {
            $group : {
              _id: {
                  "month" : { "$month" : "$reviews.date"},
                  "id": "$_id"
              }
            }
        },
        { $match :  {'_id.month': monthQuery} }
      ];
    },
    'flota':function(customer, monthQuery){
      return [
        { $project: {_id: 1, 'reviews.date': 1, 'customer.localId': 1}},
        { $unwind : "$reviews" },
        { $match :  {'customer.localId': customer.localId} },
        {
            $group : {
              _id: {
                  "month" : { "$month" : "$reviews.date"},
                  "id": "$_id"
              }
            }
        },
        { $match :  {'_id.month': monthQuery} }
      ];
    }
};

const QUERY_TOTAL_FLEETS = {
    'admin': function(customer){
      return [
        {
          $group : {
            _id: { "fleet" : "$customer.localName"},
            "total": { $sum: 1 }
          }
        }
      ];
    },
    'cda': function(customer){
      return [
        { $match: { 'customer.channelId': customer.localId } },
        {
            $group : {
              _id: { "fleet" : "$customer.localName"},
              "total": { $sum: 1 }
            }
        }
      ];
    },
    'sede': function(customer){
      return [
        { $match: { 'customer.distributorId': customer.localId } },
        {
            $group : {
              _id: { "fleet" : "$customer.localName"},
              "total": { $sum: 1 }
            }
        }
      ];
    },
    'flota':function(customer){
      return [
        { $match: { 'customer.localId': customer.localId  } },
        {
            $group : {
              _id: { "fleet" : "$customer.localName"},
              "total": { $sum: 1 }
            }
        }
      ];
    }
};

const QUERY_TOTAL_VEHICLES = {
    'admin': function(customer){
      return { active:true };
    },
    'cda': function(customer){
      return {'customer.channelId': customer.localId, active: true };
    },
    'sede': function(customer){
      return {'customer.distributorId': customer.localId, active: true };
    },
    'flota':function(customer){
      return {'customer.localId': customer.localId, active: true };
    }
};
