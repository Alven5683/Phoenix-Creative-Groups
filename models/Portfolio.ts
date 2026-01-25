import mongoose, { Schema, models, model } from 'mongoose';

const PortfolioSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String }, // Cloudinary URL
	projectUrl: { type: String },
	featured: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
});

export default models.Portfolio || model('Portfolio', PortfolioSchema);