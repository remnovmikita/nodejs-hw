import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      default: '',
      type: String,
      trim: true,
    },
    tag: {
      type: String,
      required: false,
      enum: TAGS,
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
noteSchema.index({ tag: 1 });

export const Note = model('Note', noteSchema);
