'use strict';

import _ from 'lodash';
import { decodedToken } from './../../auth/auth.service';

const DATA_QUERY = {
  'admin': function(user){
    return { active: true, "_id": { $ne: user.customer.localId } }; //SAPCO puede ver todos
  },
  'cda': function(user){
    return { active: true, "channelId": user.customer.localId , "_id": { $ne: user.customer.localId } };
  },
  'sede': function(user){
    return { active: true, "channelId": user.customer.localId, "_id": { $ne: user.customer.localId } };
  },
  'flota': function(user){
    return { active: true, "distributorId": user.customer.localId, "_id": { $ne: user.customer.localId } };
  },
  'tecnico': function(){
    return { active: true, "channelId": user.customer.localId , "_id": { $ne: user.customer.localId } };
  },
  'provider_app': function(){
    return {};
  },
  'country Manager': function(){
    return {};
  },
  'default': function(){
    return {};
  }
};

export function filterByRole(req) {
  //Se obtiene el token req.headers.authorization
  //Utilizamos solo la parte del token
  let user = currentUserFromToken(req);
  return DATA_QUERY[user.role](user) || DATA_QUERY['default']() ;
}

export function aggregateCustomers(req) {
  let user = currentUserFromToken(req);
  let query =  DATA_QUERY[user.role](user) || DATA_QUERY['default']() ;
  return { $match: `${query}` },{ $group:{  _id: { type: '$type.name', localId: '$_id', name: '$name' } } } ;
}

// Obtiene todas las flotas de un CDA
export function getDistributors(req) {
  let user = currentUserFromToken(req);

  const CHANNEL= {
    'admin': function(){
      return { 'type.id': '3' }; //SAPCO puede ver todos
    },
    'cda': function(user){
      return { 'type.id': '3', "channelId": user.customer.localId };
    },
    'sede': function(user){
      return { 'type.id': '3', "channelId": user.customer.channelId };
    },
    'tecnico': function(user){
      return { 'type.id': '3', "channelId": user.customer.channelId };
    },
    'flota': function(user){
      return { "_id": user.customer.localId };
    },
    'country Manager': function(user){
      return { "_id": user.customer.localId };
    },
  };

  return CHANNEL[user.role](user);
}

/**
 * Get All Providers
 * 
 */
export function getProviders(req) {
  let user = currentUserFromToken(req);

  let query = {};

  switch (user.role) {
    case 'admin':
      query = { 'type.id': '4' };
      break;
    default:
      query = { 'type.id': '4', 'customerCreateId': user.customer.localId };
      break;
  }

  return query;
}

export function iAmProvider(req){
  const user = currentUserFromToken(req);

  return { 'type.id': '4', 'channelId': user.customer.localId };
}

export function myCustomers(type, localId) {
  const query = {
    0:{
      'type.id': '1'
    },
    1:{
      'type.id': '1',
      'channelId': localId
    },
    2:{
      'type.id': '2',
      'channelId': localId
    },
    3:{
      'type.id': '3',
      'distributorId': localId
    },
    999:{
      'type.id': '2'
    }
  };
  return query[type];
}

// Trae los clientes de acuerdo a rol
export function myFilterCustomers(req, typeId) {
  let user = currentUserFromToken(req);
  const FILTER = {
    'admin':function(user,typeId){
      return {'type.id': typeId};
    },
    'cda': function(user, typeId){
      return {'type.id': typeId, 'channelId': user.customer.localId };
    },
    'sede': function(user, typeId){
      return {'type.id': typeId, 'distributorId': user.customer.localId };
    },
    'flota': function(user, typeId){
      return {'type.id': typeId, '_id': user.customer.localId };
    },
  };

  return FILTER[user.role](user, typeId) || {};
}

/**
* Get user from token
*/
function currentUserFromToken(req) {
  return decodedToken(req.headers.authorization.split('Bearer ')[1]);
}
