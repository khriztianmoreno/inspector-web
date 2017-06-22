'use strict';

import _ from 'lodash';
import * as service from './image.service';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

export function uploadImage(req, res) {
  const { image } = req.body;
	
  if (image) {
    const parsedImage = service.parseBase64Image(image);
    const name = service.generateName(req.user, parsedImage.contentType);
    
    service.uploadFromBase64(parsedImage.content, name, parsedImage.contentType)
      .then(url => ({ image_url: url }))
      .then(respondWithResult(res))
      .catch(handleError(res));
  } else {
    handleError(res, 422)({ error: 'Missing params, image is required.' });
  }
}
