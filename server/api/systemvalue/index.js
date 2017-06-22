'use strict';

var express = require('express');
var controller = require('./systemvalue.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:group', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
