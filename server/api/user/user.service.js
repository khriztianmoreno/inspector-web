'use strict';

import _ from 'lodash';
import { decodedToken } from './../../auth/auth.service';

const DATA_QUERY = {
  'admin': function(user){
    return {active: true}; //SAPCO puede ver todos
  },
  'cda': function(user){
    return {active: true, 'customer.channelId': user.customer.localId };
  },
  'sede': function(user){
    return {active: true, 'customer.distributorId': user.customer.localId };
  },
  'flota': function(user){
    return {active: true, 'customer.localId': user.customer.localId };
  },
  'default': function(){
    return {};
  }
};

export function myUsers(req) {
  //Se obtiene el token req.headers.authorization
  //Utilizamos solo la parte del token
  let user = currentUserFromToken(req);
  return DATA_QUERY[user.role](user) || DATA_QUERY['default']() ;
}

export function usersByRole(req){
  let user = currentUserFromToken(req),
      role = req.params.role;

  const DATA= {
    'admin': function(user, role){
      return {active: true, role: role}; //SAPCO puede ver todos
    },
    'cda': function(customer, role){
      return {active: true, 'customer.channelId': customer.localId , role: role};
    },
    'sede': function(customer, role){
      return {active: true, 'customer.distributorId': customer.localId, role: role };
    },
    'flota': function(customer, role){
      return {active: true, 'customer.localId': customer.localId, role: role };
    }
  };

  return DATA[user.role](user.customer, role);
}


/**
 * Get user from token
 */
function currentUserFromToken(req) {
  return decodedToken(req.headers.authorization.split('Bearer ')[1]);
}
