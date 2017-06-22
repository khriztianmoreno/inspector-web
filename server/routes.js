/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
const cors = require('cors')

export default function(app) {

  const whitelist = [
    'http://localhost:3000', 
    'http://localhost:9000',
    'http://mobiproveedores.s3-website-us-west-2.amazonaws.com',
    'http://mobiprov.com',
  ];

  const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  app.use(cors());

  // Insert routes below
  app.use('/api/promotions', require('./api/promotion'));
  app.use('/api/orders', require('./api/order'));
  app.use('/api/provider-requests', require('./api/provider-request'));
  app.use('/api/mileageSnapshots', require('./api/mileageSnapshot'));
  app.use('/api/trackings', require('./api/tracking'));
  app.use('/api/warnings', require('./api/warning'));
  app.use('/api/inspections', require('./api/inspection'));
  app.use('/api/systemvalues', require('./api/systemvalue'));
  app.use('/api/reviews', require('./api/review'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/vehicles', require('./api/vehicle'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/images', require('./api/image'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
