/**
 * ProviderRequest model events
 */

'use strict';

import {EventEmitter} from 'events';
import ProviderRequest from './provider-request.model';
var ProviderRequestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ProviderRequestEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ProviderRequest.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ProviderRequestEvents.emit(event + ':' + doc._id, doc);
    ProviderRequestEvents.emit(event, doc);
  }
}

export default ProviderRequestEvents;
