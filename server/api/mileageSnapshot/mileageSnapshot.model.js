'use strict';

const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  localId: {type: String, required: true },
  localName: {type: String, uppercase: true, required: true },
  channelId : {type: String, default: null },
  channelName : {type: String, default: null, uppercase: true },
  distributorId : {type: String, default: null },
  distributorName : {type: String, default: null, uppercase: true }
}, { _id: false });

const MileageSnapshotSchema = new mongoose.Schema({
  localId: {type: String,required: true},
  plate: {type: String, uppercase: true,required: true},
  vehicleClass: {type: String, uppercase: true,required: true},
  actualMileage: { type: Number,required: true, default: 0 },
  previousMileage: { type: Number,required: true, default: 0 },
  averageMileageDay: { type: Number,required: true, default: 0 },
  daysSinceLastUpdate:{ type: Number,required: true, default: 0 },
  customer:CustomerSchema
}, { timestamps: true });

//Index by Vehicle
MileageSnapshotSchema.index({ 'plate': 1, 'localId': 1 });

export default mongoose.model('MileageSnapshot', MileageSnapshotSchema);
