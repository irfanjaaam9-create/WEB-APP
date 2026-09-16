import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

const DEFAULT_ADMIN_EMAIL = 'admin@zoy-tech.com';
const DEFAULT_ADMIN_PASSWORD = 'AdminZoy2024!';

export async function ensureAdminExists(): Promise<void> {
  const email = (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim();
  const password = process.env.ADMIN_PASSWORD?.trim() || DEFAULT_ADMIN_PASSWORD;
  const name = 'Admin';

  try {
    await connectDB();

    const existing = await User.findOne({ role: 'admin' }).lean();
    if (existing) return;

    await User.create({ email, password, name, role: 'admin' });

    console.info(
      `[init-admin] MongoDB admin created with email: ${email}. Change the password after first login.`
    );
  } catch (err) {
    console.error('[init-admin] Failed to create admin user:', err);
    throw err;
  }
}
