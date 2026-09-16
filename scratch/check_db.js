import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;

async function check() {
  if (!uri) {
    console.log('No MONGODB_URI');
    return;
  }
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const settings = await db.collection('sitesettings').findOne({ key: 'global' });
  if (settings) {
    console.log('Catalog:', JSON.stringify(settings.machineryCatalog, null, 2));
  } else {
    console.log('No settings found');
  }
  mongoose.disconnect();
}
check();
