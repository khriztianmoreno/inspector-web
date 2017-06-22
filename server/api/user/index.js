'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/my', auth.isAuthenticated(), controller.my);
router.post('/forgot-password', controller.forgot);
router.post('/reset-password/', controller.reset);
router.get('/reset/:token', controller.resetValidate);
router.get('/users/:role', controller.usersByRole);
router.get('/provider/:id', controller.usersByProvider);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/mobile/find/:email', auth.isAuthenticated(), controller.findByEmail);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);


module.exports = router;
