
import mongoose, { Schema, models, model } from 'mongoose';
import '../models/Category';
import '../models/Author';


const BlogPostModelSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String },
  image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  date: { type: String },
  readTime: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.BlogPostModel || model('BlogPostModel', BlogPostModelSchema);
