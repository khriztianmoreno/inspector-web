/**
 * Warning model events
 */

'use strict';

import {EventEmitter} from 'events';
import Warning from './warning.model';
var WarningEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WarningEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Warning.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WarningEvents.emit(event + ':' + doc._id, doc);
    WarningEvents.emit(event, doc);
  }
}

export default WarningEvents;
