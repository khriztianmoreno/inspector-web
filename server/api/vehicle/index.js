'use strict';

var express = require('express');
var controller = require('./vehicle.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/plate/:plate', auth.isAuthenticated(), controller.plate);
router.get('/search/:filter', auth.isAuthenticated(), controller.find);
router.get('/widgets', auth.isAuthenticated(), controller.dashBoardFleet);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.get('/:page/:limit', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);

module.exports = router;
