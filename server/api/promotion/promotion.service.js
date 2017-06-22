'use strict';

const decodedToken = require('./../../auth/auth.service').decodedToken;


export function myPromotions(req) {
  let user = currentUserFromToken(req);
  console.log('current', user.customer);
  const QUERY = {
    'country Manager': function(currentUser) {
      return {
        'owner.channelId': currentUser.customer.localId
      };
    },
    'provider_app': function(currentUser) {
      return {
        'owner.distributorId': currentUser.customer.localId
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