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

const StatusSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, uppercase: true },
  color: { type: String, uppercase: true },
  time: { type: Date, default: Date.now },
  user: {
    localId: { type: String },
    name: { type: String, uppercase: true }
  }
}, { _id: false });

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true },
  localId: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, default: new Date() }
}, { _id: false });

const AttachmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true, uppercase: true },
});

AttachmentSchema.path('type').validate(function (value) {
  return /IMAGE|LINK|DOCUMENT/i.test(value)
}, 'Attachment, Invalid type Attachment in TrackingSchema');

const WarningSchema = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true  },
  localId: { type: String, required: true },
  color: { type: String, uppercase: true },
  type: { type: String, required: true, uppercase: true },
  periodicity: { type: Number, required: true },
  nextReviewMileage: { type: Number },
  nextReviewDate: { type: Number },
  actualMileage: { type: Number, required: true },
  dateReview: { type: Date, default: Date.now }
}, { _id: false });

WarningSchema.path('type').validate(function (value) {
  return /VEHICLE_PART|DOCUMENT/i.test(value)
}, 'Error, Invalid type alert in WarningSchema');

const TrackingSchema = new mongoose.Schema({
  vehicle: {
    localId: { type: String, required: true },
    plate: { type: String, uppercase: true, required: true }
  },
  currentStatus: {
    id: { type: Number, required: true },
    name: { type: String, uppercase: true, required: true }
  },
  warning: WarningSchema,
  description: { type: String, lowercase: true },
  active: { type: Boolean,default: true },
  customer: CustomerSchema,
  provider: CustomerSchema,
  historyStatus: [StatusSchema],
  comments: [CommentSchema],
  attachments: [AttachmentSchema]
}, { timestamps: true });

export default mongoose.model('Tracking', TrackingSchema);
