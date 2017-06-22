'use strict';

var app = require('../..');
import request from 'supertest';

describe('Image API:', function() {
  describe('POST /images/upload', function() {
    let image = `data:image/png;base64,
    iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4A
    sCEzMSHvtB6QAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAGklEQVQoz2P8u4KZ
    gRTAxEAiGNUwqmHoaAAARIUByIuoSbwAAAAASUVORK5CYII=`;
    let uploadedImage;

    beforeEach(function (done) {
      request(app)
        .post('/api/images/upload')
        .send({ image })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          uploadedImage = res.body;
          done();
        });
    });

    it('should respond with the image url', function () {
      expect(uploadedImage.image_url).to.match(/https?:\/\/(.*)\.blob.core\.windows\.net\/(.*)/);
    });

  })
})
