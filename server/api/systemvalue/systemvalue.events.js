/**
 * Systemvalue model events
 */

'use strict';

import {EventEmitter} from 'events';
import Systemvalue from './systemvalue.model';
var SystemvalueEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SystemvalueEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Systemvalue.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SystemvalueEvents.emit(event + ':' + doc._id, doc);
    SystemvalueEvents.emit(event, doc);
  }
}

export default SystemvalueEvents;
