'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import * as service from './user.service';
import _ from 'lodash';

const path = require('path');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const SERVER_PATH = path.join(__dirname, './../../views');

const OPTIONS_HBS = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: `${SERVER_PATH}/email`,
        defaultLayout : 'template',
        partialsDir : `${SERVER_PATH}/partials`
    },
    viewPath: `${SERVER_PATH}/email`,
    extName: '.hbs'
};

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
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
    console.log('Error User: ', err);
    res.status(statusCode).send(err);
  };
}

function saveUpdates(updates) {
  return function(entity) {
    let updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Gets my users
 */
export function my(req, res) {
  let query = service.myUsers(req);

  return User.find(query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


/**
 * Send Maiel for reset password
 */
export function forgot(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(16, (err, buf) => {
        const token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({
        email: req.body.email
      }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return res.status(204).json({msg: 'User not Found'});
        }
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        user.save((err) => {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
          auth: {
              user: 'soporte@sapco.co',
              pass: 'inGENIO2016'
          }
      });
      const mailOptions = {
        to: user.email,
        from: '"Mobi Business" <soporte@sapco.co>',
        subject: 'Reset your password on Mobi Business',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
              Please click on the following link, or paste this into your browser to complete the process:\n\n
              http://${req.headers.host}/reset/${token}\n\n
              If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
      transporter.sendMail(mailOptions, (err) => {
        /*req.flash('info', {
          msg: `An e-mail has been sent to ${user.email} with further instructions.`
        });*/
        done(err);
      });

      return res.status(200).json(user);
    }
    ], (err, result) => {
          if (err) {
            return next(err);
          }
      }
  );

}

/**
 * Reset password and send email
 */
export function reset(req, res, next){
  let query = {
    passwordResetToken: req.body.token,
    passwordResetExpires: { $gt: Date.now() }
  };

  async.waterfall([
    function (done) {
      User
        .findOne(query)
        .exec((err, user) => {
          if (err) { return next(err); }
          if (!user) {
            return res.status(204).json({msg: 'Password reset token is invalid or has expired'});
          }

          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          user.save((err) => {
            if (err) { return next(err); }
            return res.status(200).json(user);
          });
        });
    },
    function (user, done) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'soporte@sapco.co',
            pass: 'inGENIO2016'
        }
      });
      const mailOptions = {
        to: user.email,
        from: '"Mobi Business" <soporte@sapco.co>',
        subject: 'Your Mobi Business password has been changed',
        text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
      };
      transporter.sendMail(mailOptions, (err) => {
        done(err);
      });
    }
  ], (err) => {
    if (err) { return next(err); }
  });
}

export function resetValidate(req, res, next){
  let query = {
    passwordResetToken: req.params.token,
    passwordResetExpires: { $gt: Date.now() }
  };

  return User.findOne(query).exec()
    .then(user => {
      if (!user) {
        return res.status(204).json({msg: 'Password reset token is invalid or has expired'});
      }
      res.json(user._id);
    })
    .catch(err => next(err));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  let newUser = new User(req.body);
  let host =req.headers.host;

  newUser.provider = 'local';
  newUser.password = 'abc123'; //Poner otro password

  crypto.randomBytes(16, (err, buf) => {
    const token = buf.toString('hex');
    newUser.passwordResetToken = token;
    newUser.passwordResetExpires = Date.now() + 86400000; // 24 hour

    User.create(newUser)
      .then(() => {
        //Send email
        let transporter = nodemailer.createTransport({
          service: 'Gmail',
            auth: {
                user: 'soporte@sapco.co',
                pass: 'inGENIO2016'
            }
        });

        transporter.use('compile', hbs(OPTIONS_HBS));

        let mail = {
          to: newUser.email,
          from: '"Mobi Business" <soporte@sapco.co>',
          subject: "Has sido añadido a una cuenta de Mobi Business",
          template: 'template',
          context: {
            logo  : `http://${host}/assets/images/logos/mobi_Business_email.png`,
            name  : newUser.name.toUpperCase(),
            url   : `http://${host}/reset/${token}`
          }
        };

        transporter.sendMail(mail, function (err) {
          console.log('Envio', err);
        });

        return res.status(200).json(newUser);

      });

  });
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  let userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(204).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
  /*return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));*/
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  let userId = req.user._id;
  let oldPass = String(req.body.oldPassword);
  let newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  let userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

export function findByEmail(req, res, next) {
  let email = req.params.email;
  console.log('email', email);

  return User.findOne(
      { 'email': email},
      {'customer.localId':1, 'customer.localName':1}
    ).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Search all active users of a specific role
export function usersByRole(req, res, next){
  const query = service.usersByRole(req);

  return User.find(query, {_id:1, name:1, customer:1}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function usersByProvider(req, res, next){
  const idProvider = req.params.id;
  const query  = { 'customer.localId': idProvider, active: true };
  
  return User.find(query).sort({ createdAt : -1 }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}


const createToken = function(done) {
  crypto.randomBytes(16, (err, buf) => {
    const token = buf.toString('hex');
    done(err, token);
  });
};

const findUserByEmail = function(token, done) {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return res.status(404).end();
    }
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    user.save((err) => {
      done(err, token, user);
    });
  });
};

const sendMailResetPassword = function(token, user, done) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
      auth: {
          user: 'soporte@sapco.co',
          pass: 'inGENIO2016'
      }
  });
  const mailOptions = {
    to: user.email,
    from: '"Mobi Business" <soporte@sapco.co>',
    subject: 'Reset your password on Mobi Business',
    text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };
  transporter.sendMail(mailOptions, (err) => {
    /*req.flash('info', {
      msg: `An e-mail has been sent to ${user.email} with further instructions.`
    });*/
    done(err);
  });
};
