'use strict';

import {Router} from 'express';
import * as controller from './customer.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/distributors', auth.isAuthenticated(), controller.distributors);
router.get('/providers', auth.isAuthenticated(), controller.providers);
router.get('/iamProvider', auth.isAuthenticated(), controller.iamProvider);

router.get('/provider/:id/headquartes', auth.isAuthenticated(), controller.headquartesByProviders);

router.get('/myServices/:id/', auth.isAuthenticated(), controller.myServices);
router.get('/filter/:type/', auth.isAuthenticated(), controller.filterMyCustomers);
router.get('/my/:type/:localId', auth.isAuthenticated(), controller.my);
router.get('/myall', auth.isAuthenticated(), controller.myAllCustomers);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.get('/:id', auth.isAuthenticated(), controller.show);

module.exports = router;
