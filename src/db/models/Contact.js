import { Schema, model } from 'mongoose';
import { contactType } from '../../constants/contacts-constants.js';
import { mongooseSaveError, setUpdateSettings } from './hooks.js';

const contactSchema = new Schema({
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
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            enum: contactType,
            required: true,
            default: 'personal',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        photo: {
                type: String
            },
    },
    {
    timestamps: true,
    versionKey: false,
    });

contactSchema.post("save", mongooseSaveError);
contactSchema.pre("findOneAndUpdate", setUpdateSettings);
contactSchema.post("findOneAndUpdate", mongooseSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
