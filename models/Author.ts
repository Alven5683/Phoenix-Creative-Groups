import mongoose, { Schema, model, models } from 'mongoose';


const AuthorSchema = new Schema({
  name: { type: String, required: true, unique: true },
  role: { type: String },
  avatar: { type: String },
  social: {
    twitter: { type: String },
    linkedin: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    website: { type: String },
  },
});

const Author = models.Author || model('Author', AuthorSchema);

export default Author;