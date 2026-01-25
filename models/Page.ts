import mongoose, { Schema, models, model } from 'mongoose';

const PageSchema = new Schema({
	pageName: { type: String, required: true, unique: true },
	sections: { type: Schema.Types.Mixed }, // flexible for different page sections
	seoMeta: {
		title: String,
		description: String,
	},
	updatedAt: { type: Date, default: Date.now },
});

export default models.Page || model('Page', PageSchema);