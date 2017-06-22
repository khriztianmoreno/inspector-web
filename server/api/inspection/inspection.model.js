'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var LanguageSchema = new mongoose.Schema({
  language: {type: String, lowercase: true },
  description: String
}, { _id : false });

var ValueSchema = new mongoose.Schema({
  name: Schema.Types.Mixed
  //"name" : {"es": { "language" : "es", "description" : "Cinturones de seguridad" }},
},{ _id : false });

var ItemSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: Schema.Types.Mixed,
  //"name" : {"es": { "language" : "es", "description" : "Cinturones de seguridad" }},
  code: {type: String, uppercase: true },
  type: {type: String, uppercase: true },
  isRequired: Boolean,
  values:[ValueSchema]
});

var InspectionSchema = new mongoose.Schema({
  name: { type: String, uppercase: true, required: true },
  type:{type: String, uppercase: true, default: 'PREVENTIVE' },
  customer:{
    localId: {type: String, required: true },
    localName: {type: String, uppercase: true, required: true }
  },
  periodicity:{
    type:{type: String, uppercase: true },
    value: {type: Number, default: 1}
  },
  check: [{
    category: [
      {
        language: {type: String, lowercase: true },
        description: String,
        color: {type: String, default: '#fffff'}
      }
    ],
    items:[ItemSchema]
  }]
}, { timestamps: true });

InspectionSchema.path('periodicity.type').validate(function (value) {
  return /MONTHLY|DAILY|KILOMETER/i.test(value)
}, 'Invalid type periodicity in inspection');

InspectionSchema.path('type').validate(function (value) {
  return /PREVENTIVE|SAFE_CAR|ENLISTMENT/i.test(value)
}, 'Invalid type the inspection');

export default mongoose.model('Inspection', InspectionSchema);
