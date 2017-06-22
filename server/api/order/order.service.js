'use strict';

const _ = require('lodash');
const moment = require("moment");
const decodedToken = require('./../../auth/auth.service').decodedToken;


export function myOrders(req) {
  let user = currentUserFromToken(req);
  const QUERY = {
    'country Manager': function(currentUser) {
      return {
        'provider.channelId': currentUser.customer.localId
      };
    },
    'provider_app': function(currentUser) {
      return {
        'provider.channelId': currentUser.customer.localId
      };
    },
  };

  return QUERY[user.role](user);
}



/**
 * Get user from token
 */
function currentUserFromToken(req) {
  return decodedToken(req.headers.authorization.split('Bearer ')[1]);
}