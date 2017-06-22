'use strict';

import passport from 'passport';
import config from '../config/environment';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../api/user/user.model';

var validateJwt = expressJwt({
  secret: config.secrets.session
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            console.log('ACA');
            return res.status(401).end();
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
export function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      const { role } = req.user;
      if ((~config.userRoles.indexOf(role)) && (~roleRequired.indexOf(role))) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}

/**
* Decodifica el token para entregar el objeto
*
*/
export function decodedToken(token) {
  let decoded = jwt.verify(token, config.secrets.session);
  return { _id: decoded._id, role: decoded.role, customer: decoded.customer };
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, name, role, customer) {
  return jwt.sign({ _id: id, role, customer, name }, config.secrets.session, {
    expiresIn: 60 * 60 * 24
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = signToken(req.user._id, req.user.name, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}
