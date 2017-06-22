'use strict';

import mongoose from 'mongoose';

var CustomerSchema = new mongoose.Schema({
  localId: {type: String, required: true },
  localName: {type: String, uppercase: true, required: true },
  channelId : {type: String, default: null },
  channelName : {type: String, default: null, uppercase: true },
  distributorId : {type: String, default: null },
  distributorName : {type: String, default: null, uppercase: true }
}, {
  _id: false
});

var WarningSchema = new mongoose.Schema({
  name: { type: String, uppercase: true, required: true },
  vehicleClass: { type: String, uppercase: true, required: true },
  color: { type: String, uppercase: true, required: true },
  mileage: { type: Number },
  days: { type: Number},
  active: {
    type: Boolean,
    default: true
  },
  type: { type: String, default: 'VEHICLE_PART', required: true, uppercase: true },
  customer: CustomerSchema
}, { timestamps: true });

WarningSchema.path('type').validate(function (value) {
  return /VEHICLE_PART|DOCUMENT/i.test(value)
}, 'document, Invalid type docuement in vehicle');

export default mongoose.model('Warning', WarningSchema);
