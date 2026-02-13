import mongoose, { Schema, models, model } from 'mongoose';

const PortfolioSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	image: { type: String }, // Cloudinary URL
	projectUrl: { type: String },
	featured: { type: Boolean, default: false },
	content: { type: String }, // Rich content field
	category: { type: String },
	author: {
		name: { type: String },
		avatar: { type: String },
		role: { type: String },
		contactLinks: [{ type: { type: String }, url: { type: String } }],
	},
	tags: [{ type: String }],
	startDate: { type: String },
	endDate: { type: String },
	faqs: [{ question: { type: String }, answer: { type: String } }],
	testimonials: [{ name: { type: String }, role: { type: String }, text: { type: String }, rating: { type: Number } }],
	relatedProjects: [{ id: { type: String }, title: { type: String }, image: { type: String }, category: { type: String }, shortDescription: { type: String } }],
	challenge: { type: String },
	solution: { type: String },
	results: [{ stat: { type: String }, description: { type: String } }],
	gallery: [{ type: String }],
	createdAt: { type: Date, default: Date.now },
});

export default models.Portfolio || model('Portfolio', PortfolioSchema);