'use strict';

import mongoose from 'mongoose';

var OrderSchema = new mongoose.Schema({
  reference: { type: String, uppercase: true, required: true },
  provider: {
    channelId: { type: String, required: true },
    channelName: { type: String, uppercase: true, required: true },
    distributorName: { type: String, required: true },
    distributorId: { type: String, uppercase: true, required: true },
    localId: { type: String, required: true },
    name: { type: String, uppercase: true, required: true },
  },
  customer: {
    localId: { type: String, required: true },
    name: { type: String, uppercase: true, required: true },
    phone: {type: String, required: true },
    email: { type: String, lowercase: true, required: true, trim: true },
  },
  service: {
    id: { type: String, required: true },
    name: { type: String, required: true, uppercase: true, }
  },
  status: { type: String, uppercase: true, required: true, default: 'PENDING' },
  comment: String,
}, { timestamps: true });

OrderSchema.path('reference').validate(function (value) {
  return /CARWASH|ASSISTANCE|MECHANICAL|OTHER/i.test(value)
}, 'Order, Invalid reference type');

OrderSchema.path('status').validate(function (value) {
  return /ACCEPTED|PENDING|CANCELED/i.test(value)
}, 'Order, Invalid reference type');


export default mongoose.model('Order', OrderSchema);
