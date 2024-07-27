import { model, Schema } from 'mongoose';
import { moongooseSaveError, setUpdateSettings } from './hooks.js';

const sessionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

sessionSchema.post('save', moongooseSaveError);
sessionSchema.pre('findOneAndUpdate', setUpdateSettings);
sessionSchema.post('findOneAndUpdate', moongooseSaveError);

export const Session = model('sessions', sessionSchema);
