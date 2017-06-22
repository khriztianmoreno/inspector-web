/**
 * MileageSnapshot model events
 */

'use strict';

import {EventEmitter} from 'events';
import MileageSnapshot from './mileageSnapshot.model';
var MileageSnapshotEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MileageSnapshotEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  MileageSnapshot.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MileageSnapshotEvents.emit(event + ':' + doc._id, doc);
    MileageSnapshotEvents.emit(event, doc);
  }
}

export default MileageSnapshotEvents;
