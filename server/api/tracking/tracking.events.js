/**
 * Tracking model events
 */

'use strict';

import {EventEmitter} from 'events';
import Tracking from './tracking.model';
var TrackingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TrackingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Tracking.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TrackingEvents.emit(event + ':' + doc._id, doc);
    TrackingEvents.emit(event, doc);
  }
}

export default TrackingEvents;
