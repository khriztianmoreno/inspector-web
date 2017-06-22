/**
 * Promotion model events
 */

'use strict';

import {EventEmitter} from 'events';
import Promotion from './promotion.model';
var PromotionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PromotionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Promotion.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PromotionEvents.emit(event + ':' + doc._id, doc);
    PromotionEvents.emit(event, doc);
  }
}

export default PromotionEvents;
