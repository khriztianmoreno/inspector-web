'use strict';

import { Router } from 'express';
import * as controller from './image.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.post('/upload', auth.isAuthenticated(), controller.uploadImage);

module.exports = router;
