import { Schema, model } from 'mongoose';

import { mongooseSaveError, setUpdateSettings } from "./hooks.js";
import { contactTypes, phoneNumberRegex } from '../../constants/contact-constants.js'

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        match: phoneNumberRegex,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: contactTypes,
        default: 'personal',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    photo: {
        type: String,
    }
}, {
    versionKey: false,
    timestamps: true,
});

contactSchema.post("save", mongooseSaveError);

contactSchema.pre("findOneAndUpdate", setUpdateSettings);

contactSchema.post("findOneAndUpdate", mongooseSaveError);

const Contact = model('contact', contactSchema);

export default Contact;
