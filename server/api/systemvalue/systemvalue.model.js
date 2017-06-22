'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var SystemvalueSchema = new mongoose.Schema({
  group: String,
  values: [Schema.Types.Mixed]
}, { timestamps: true });

export default mongoose.model('Systemvalue', SystemvalueSchema);
