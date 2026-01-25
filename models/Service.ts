import mongoose, { Schema, models, model } from 'mongoose';

const ServiceSchema = new Schema({
	title: { type: String, required: true },
	slug: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	content: { type: String }, // rich text
	image: { type: String }, // image URL
	seoMeta: {
		title: String,
		description: String,
	},
	createdAt: { type: Date, default: Date.now },
});

export default models.Service || model('Service', ServiceSchema);