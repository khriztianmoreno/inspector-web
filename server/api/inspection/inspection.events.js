/**
 * Inspection model events
 */

'use strict';

import {EventEmitter} from 'events';
import Inspection from './inspection.model';
var InspectionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
InspectionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Inspection.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    InspectionEvents.emit(event + ':' + doc._id, doc);
    InspectionEvents.emit(event, doc);
  }
}

export default InspectionEvents;
