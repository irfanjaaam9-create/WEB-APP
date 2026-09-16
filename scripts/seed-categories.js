const fs = require('fs');
const path = require('path');
const dns = require('node:dns');
const mongoose = require('mongoose');

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const envText = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const match = envText.match(/^\s*MONGODB_URI=(.*)$/m);
if (!match) throw new Error('MONGODB_URI missing from .env');
const uri = match[1].trim().replace(/^["']|["']$/g, '');

const categories = [
  ['psa-oxygen-generator', 'PSA Oxygen Generator'],
  ['hyperbaric-oxygen-chamber', 'Hyperbaric Oxygen Chamber'],
  ['oxygen-cylinder-filling', 'Oxygen Cylinder Filling System'],
  ['container-package-system', 'Container Package System'],
  ['whole-house-supply', 'Whole-House Oxygen Supply'],
  ['other', 'Other'],
];

const Category = mongoose.models.ProductCategory || mongoose.model('ProductCategory', new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  featuredImage: { type: String, default: '' },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
}, { timestamps: true }));

async function main() {
  await mongoose.connect(uri, { family: 4 });
  for (const [slug, name] of categories) {
    await Category.updateOne({ slug }, { $setOnInsert: { slug, name } }, { upsert: true });
  }
  console.log(`Seeded ${categories.length} product categories`);
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error('CATEGORY_SEED_ERROR', error.message || error);
  process.exit(1);
});
