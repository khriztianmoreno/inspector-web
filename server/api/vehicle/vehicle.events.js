/**
 * Vehicle model events
 */

'use strict';

import {EventEmitter} from 'events';
import Vehicle from './vehicle.model';
var VehicleEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
VehicleEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Vehicle.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    VehicleEvents.emit(event + ':' + doc._id, doc);
    VehicleEvents.emit(event, doc);
  }
}

export default VehicleEvents;
