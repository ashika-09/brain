import mongoose, { Schema } from 'mongoose';

// User Schema
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model('User', userSchema);

const tagSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const TagsModel = mongoose.model('Tag', tagSchema);

// Content Schema
const contentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    link: { type: String },
    linkType: { type: String },
    tags: [{ type: String, required: true }], 
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const ContentModel = mongoose.model('Content', contentSchema);

// Link Schema
const linkSchema = new Schema(
  {
    hash: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const LinkModel = mongoose.model('Link', linkSchema);
