// This script sets a default image for all services that do not have one.
// Run this with: `node scripts/setDefaultServiceImages.js` (after adjusting your DB connection if needed)

const mongoose = require('mongoose');
const Service = require('../models/Service').default;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/phoenixcreativegroup';
const DEFAULT_IMAGE = 'https://via.placeholder.com/300x150?text=Service+Image'; // Change to your preferred default

async function main() {
  await mongoose.connect(MONGODB_URI);
  const result = await Service.updateMany(
    { $or: [{ image: { $exists: false } }, { image: '' }] },
    { $set: { image: DEFAULT_IMAGE } }
  );
  // ...existing code...
  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
