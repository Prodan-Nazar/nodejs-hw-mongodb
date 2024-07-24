import { model, Schema } from 'mongoose';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

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
      enum: ['work', 'home', 'personal'],
      required: true,

      default: 'personal',
    },
    photo: {
      type: String,
    },
    userId: {
      type: Schema.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

contactsSchema.post('save', mongooseSaveError);

contactsSchema.pre('findOneAndUpdate', setUpdateSettings);

contactsSchema.post('findOneAndUpdate', mongooseSaveError);

const Contact = model('contact', contactsSchema);

export default Contact;
