'use strict';

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const DocumentSchema = new mongoose.Schema({
    type: { type: String, uppercase: true, required: true },
    number: { type: Number, required: true },
    expeditionDate: { type: Date },
    expirationDate: { type: Date },
    diagnosticsCenter: { type: String, uppercase: true },
    insuranceCompany: { type: String, uppercase: true },
    officeCode: { type: Number },
    cost: { type: Number },
    active: {
        type: Boolean,
        default: true
    }
});

const ReviewSchema = new mongoose.Schema({
    localId: { type: String },
    type: {type: String, uppercase: true,required: true},
    date: { type: Date, default: Date.now },
    mileage: { type: Number, required: true },
}, { _id : false });

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    dni: { type: Number, required: true },
    phone:{ type: Number }
}, { _id : false });

const VehicleDataSchema = new mongoose.Schema({
  model: { type: Number, required: true },
  brand: { type: String, uppercase: true },
  cyl: { type: Number, required: true },
  color: { type: String, uppercase: true },
  bodyWork: { type: String, uppercase: true },
  service: { type: String, uppercase: true },
  class: { type: String, uppercase: true, required: true  },
  line: { type: String, uppercase: true },
  capacity: { type: Number, uppercase: true },
  fuel: { type: String, uppercase: true },
  motor: { type: String, uppercase: true },
  serie: { type: String, uppercase: true },
  chassis: { type: String, uppercase: true },
  vin: { type: String, uppercase: true },
  mileage: { type: Number, required: true },
  owner: {
      fullName: { type: String, uppercase: true },
      identification: {
          number: { type: String, uppercase: true },
          origin: { type: String, uppercase: true }
      }
  }
}, { _id : false });

const CustomerSchema = new mongoose.Schema({
  localId: {type: String, required: true },
  localName: {type: String, uppercase: true, required: true },
  channelId : {type: String, default: null },
  channelName : {type: String, default: null, uppercase: true },
  distributorId : {type: String, default: null },
  distributorName : {type: String, default: null, uppercase: true }
}, { _id: false });

const WarningSchema = new mongoose.Schema({
  localId: {type: String, required: true },
  name: {type: String, uppercase: true, required: true },
  warningMileage: { type: Number,required: true, default: 0 },
  nextMileage: { type: Number,required: true, default: 0 },
  periodicity: { type: Number,required: true, default: 0 },
  date: { type: Date, default: Date.now },
}, { _id: false });

const VehicleSchema = new mongoose.Schema({
    image: String,
    vehicleData: VehicleDataSchema,
    plate: {
        number: { type: String, uppercase: true, required: true },
        origin: { type: String, uppercase: true, required: true }
    },
    customer: CustomerSchema,
    documents: [DocumentSchema],
    reviews: [ReviewSchema],
    warnings: [WarningSchema],
    active: {
        type: Boolean,
        default: true
    },
    contacts: [ContactSchema],
}, { timestamps: true });

// Email pattern validation
ContactSchema.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'The e-mail should be valid')

//Index by Plate
VehicleSchema.index({ 'plate.number': 1, 'plate.origin': 1 }, { unique: true });

DocumentSchema.path('type').validate(function (value) {
  return /RTM|SOAT|IMPUESTOS|SEGUROS|GAS/i.test(value)
}, 'document, Invalid type docuement in vehicle');

ReviewSchema.path('type').validate(function (value) {
  return /PREVENTIVE|SAFE_CAR|ENLISTMENT/i.test(value)
}, 'Invalid type the inspection');

VehicleSchema.plugin(mongoosePaginate);

export default mongoose.model('Vehicle', VehicleSchema);
