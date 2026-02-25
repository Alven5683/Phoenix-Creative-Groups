import mongoose, { Schema, models, model } from "mongoose";

const SettingSchema = new Schema({
  siteTitle: { type: String, default: "" },
  contactEmail: { type: String, default: "" },
  socialLinks: { type: [String], default: [] },
  footerContent: { type: String, default: "" },
}, { timestamps: true });

export default models.Setting || model("Setting", SettingSchema);
