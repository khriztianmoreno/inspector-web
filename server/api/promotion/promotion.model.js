'use strict';

import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, uppercase: true, }
});

const PromotionSchema = new mongoose.Schema({
  name: { type: String, uppercase: true, required: true },
  description: { type: String, lowercase: true, required: true },
  category: { type: String, uppercase: true, required: true, default: 'REGIONAL' },
  service: ServiceSchema, // Cuando es una campaña regional no lleva servicio
  image: { type: String, lowercase: true, required: true },
  country: { type: String, uppercase: true, default: null },
  loc: { type: [Number], index: { type: '2dsphere', sparse: true } },
  owner:{
    channelId: {type: String, required: true },
    channelName: {type: String, uppercase: true, required: true },
    distributorId : {type: String, default: null },
    distributorName : {type: String, default: null, uppercase: true },
    localId: {type: String, required: true },
    localName: {type: String, uppercase: true, required: true },
  },
  active: { type: Boolean, default: true },
}, { timestamps: true });

PromotionSchema.path('category').validate(function (value) {
  return /CARWASH|ASSISTANCE|MECHANICAL|OTHER|REGIONAL/i.test(value)
}, 'Order, Invalid category type');

export default mongoose.model('Promotion', PromotionSchema);
