'use strict';

var express = require('express');
var controller = require('./review.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(),  controller.index);
router.get('/dashboard', auth.hasRole(['cda', 'flota', 'admin', 'sede', 'tecnico flota']),  controller.dashBoard);
router.get('/totalbydays', auth.isAuthenticated(),  controller.totalByDays);
router.post('/', auth.isAuthenticated(),  controller.create);
router.post('/report', auth.isAuthenticated(),  controller.report);
router.put('/:id', auth.isAuthenticated(),  controller.update);
router.patch('/:id', auth.isAuthenticated(),  controller.update);
router.delete('/:id', auth.isAuthenticated(),  controller.destroy);
router.get('/:id', auth.isAuthenticated(),  controller.show);

module.exports = router;
