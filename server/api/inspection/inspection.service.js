'use strict';

const _ = require('lodash');
const moment = require("moment");
const decodedToken = require('./../../auth/auth.service').decodedToken;


export function myInspections(req) {
  let user = currentUserFromToken(req);
  const QUERY = {
    'admin': function() {
      return {};
    },
    'cda': function(customer) {
      return {
        'customer.localId': customer.channelId
      };
    },
    'sede': function(customer) {
      return {
        'customer.localId': customer.channelId
      };
    },
    'tecnico': function(customer) {
      return {
        'customer.localId': customer.channelId
      };
    },
    'flota': function(customer) {
      return {
        'customer.localId': customer.localId
      };
    },
    'tecnico flota': function(customer) {
      return {
        'customer.localId': customer.localId
      };
    }
  };

  return QUERY[user.role](user.customer) || {
    type: 'undefined'
  };
}


/**
 * Get user from token
 */
function currentUserFromToken(req) {
  return decodedToken(req.headers.authorization.split('Bearer ')[1]);
}
