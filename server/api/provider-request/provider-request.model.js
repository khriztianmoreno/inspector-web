'use strict';

import mongoose from 'mongoose';

var ProviderRequestSchema = new mongoose.Schema({
  name: { type: String, uppercase: true, required: true },
  email: { type: String, lowercase: true, required: true, trim: true },
  phoneNumber: {type: String, required: true },
  country: { type: String, uppercase: true, required: true },
  active: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('ProviderRequest', ProviderRequestSchema);
