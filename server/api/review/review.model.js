'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const FieldsResultSchema = new mongoose.Schema({
  name: { type: String, uppercase: true },
  code: { type: String, uppercase: true },
  value: { type: String,uppercase: true },
  localId: { type: String, uppercase: true },
  image: { type: String,lowercase: true },
  comment: {type: String,lowercase: true }
}, {
  _id: false
});

const CheckInspectionSchema = new mongoose.Schema({
  category: {type: String,uppercase: true,required: true },
  fields: [FieldsResultSchema]
}, {
  _id: false
});

const ReviewSchema = new mongoose.Schema({
  inspectionId: {type: String,required: true },
  type: { type: String,uppercase: true,required: true,default: 'PREVENTIVE' },
  cost: { type: Number,required: true, default: 1 },
  userReview: {
    localId: {type: String,required: true},
    name: {type: String,uppercase: true,required: true}
  },
  vehicle: {
    localId: {type: String,required: true},
    plate: {type: String,uppercase: true,required: true},
    mileage: { type: Number,required: true, default: 1 }, //Para saber con cual kilometraje se hizo esa revision
    class: { type: String, uppercase: true, required: true }
  },
  result: {
    images: [{type: String,lowercase: true}],
    check: [CheckInspectionSchema]
  },
  customer: {
    localId: { type: String, required: true },
    localName: { type: String, uppercase: true, required: true },
    channelId: { type: String },
    channelName: { type: String, uppercase: true },
    distributorId: { type: String },
    distributorName: { type: String, uppercase: true }
  }
}, { timestamps: true });

ReviewSchema.path('type').validate(function(value) {
  return /PREVENTIVE|SAFE_CAR|ENLISTMENT/i.test(value)
}, 'document, Invalid type docuement in vehicle');

export default mongoose.model('Review', ReviewSchema);
