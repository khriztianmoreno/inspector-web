'use strict';

import mongoose from 'mongoose';

const RepresentativeSchema = new mongoose.Schema({
  fullName: { type: String, uppercase: true, required : true },
  cellPhoneNumber: String,
  phoneNumber: String,
  email: { type: String, lowercase: true, required : true },
  address: { type: String, lowercase: true },
}, { _id: false });

const ServiceSchema = new mongoose.Schema({
  name        : { type : String, required : true, trim : true, uppercase: true },
  description : { type : String, required : true, trim : true },
  cost        : { type : Number, required : true, trim : true },
  //phoneNumber : { type : String, required : true, trim : true },
  type : { type : String, required : true, trim : true, index : true, uppercase: true },
  active : { type : Boolean, default : true },
});

const CustomerSchema = new mongoose.Schema({
  name: { type: String, uppercase: true, required: true },
  type: {
    id:   { type: String, required: true },
    name: { type: String, required: true }
  },
  city: { type: String, uppercase: true },
  address: { type: String, uppercase: true },
  identification:{
    number: { type: String, uppercase: true },
    origin: { type: String, uppercase: true },
    type: { type: String, uppercase: true }
  },
  representative: RepresentativeSchema,
  payment:{
    businessName: { type: String },
    phoneNumber: {type: String },
    email: { type: String, lowercase: true },
    cost: Number
  },
  channelId : {type: String, default: null },
  channelName : {type: String, uppercase: true, default: null },
  distributorId : {type: String, default: null },
  distributorName : {type: String, default: null, uppercase: true },
  customerCreateId : {type: String, default: null },
  customerCreateName : {type: String, default: null, uppercase: true, required: true },
  loc: { type: [Number], index: { type: '2dsphere', sparse: true } },
  services: [ServiceSchema],
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

CustomerSchema.path('identification.type').validate(function (value) {
  return /NIT|CC|CE/i.test(value)
}, 'customer, Invalid identification type');

export default mongoose.model('Customer', CustomerSchema);
