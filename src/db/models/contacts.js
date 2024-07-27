import { model, Schema } from 'mongoose';
import { moongooseSaveError, setUpdateSettings } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enam: ['personal', 'work', 'home'],
      default: 'personal',
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    photo: { type: String },
  },
  { versionKey: false, timestamps: true },
);

contactsSchema.post('save', moongooseSaveError);
contactsSchema.pre('findOneAndUpdate', setUpdateSettings);
contactsSchema.post('findOneAndUpdate', moongooseSaveError);

export const Contact = model('contacts', contactsSchema);
