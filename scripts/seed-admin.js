const fs = require('fs');
const path = require('path');
const dns = require('node:dns');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const envText = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
const match = envText.match(/^\s*MONGODB_URI=(.*)$/m);

if (!match) {
  console.error('MONGODB_URI missing from .env');
  process.exit(1);
}

const uri = match[1].trim().replace(/^['"]|['"]$/g, '');
const email = 'admin@zoy-tech.com';
const password = 'AdminZoy2024!';

async function main() {
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
    family: 4,
  });

  const UserSchema = new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true, lowercase: true, trim: true },
      password: { type: String, required: true },
      name: { type: String, required: true, trim: true },
      role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
    },
    { timestamps: true }
  );

  UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(String(this.password), 12);
  });

  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  const existing = await User.findOne({ email }).select('+password');

  if (!existing) {
    const created = await User.create({ email, password, name: 'Admin', role: 'admin' });
    console.log('ADMIN_CREATED', created.email);
    await mongoose.disconnect();
    return;
  }

  existing.name = existing.name || 'Admin';
  existing.role = 'admin';
  existing.password = password;
  await existing.save();
  console.log('ADMIN_UPDATED', existing.email);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('DB_ERROR', err && err.message ? err.message : err);
  process.exit(1);
});
