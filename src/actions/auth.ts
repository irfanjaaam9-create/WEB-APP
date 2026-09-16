'use server';

import { redirect } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { createSession, deleteSession, getSession, validateCsrfToken } from '@/lib/session';
import { ensureAdminExists } from '@/lib/init-admin';

export async function loginAdmin(prevState, formData) {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');
  const csrfToken = String(formData.get('csrfToken') || '');

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  const isValidCsrf = await validateCsrfToken(csrfToken);
  if (!isValidCsrf) {
    return { error: 'Security validation failed. Please refresh the page and try again.' };
  }

  try {
    await ensureAdminExists();
    await connectDB();

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return { error: 'Invalid credentials' };
    }

    await createSession(user.id, user.role);
  } catch (err) {
    console.error('Login error:', err);
    return { error: 'An unexpected error occurred' };
  }

  redirect('/admin/dashboard');
}

export async function changeAdminPassword(prevState, formData) {
  const currentPassword = String(formData.get('currentPassword') || '');
  const newPassword = String(formData.get('newPassword') || '');
  const confirmPassword = String(formData.get('confirmPassword') || '');

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, error: 'All password fields are required.' };
  }

  if (newPassword.length < 8) {
    return { success: false, error: 'New password must be at least 8 characters long.' };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, error: 'New password and confirmation do not match.' };
  }

  const session = await getSession();
  if (!session || !session.userId) {
    return { success: false, error: 'You must be logged in to change your password.' };
  }

  try {
    await connectDB();
    const user = await User.findById(session.userId).select('+password');
    if (!user) {
      return { success: false, error: 'Admin account not found.' };
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    user.password = newPassword;
    await user.save();

    return { success: true, message: 'Password updated successfully.' };
  } catch (error) {
    console.error('Password change error:', error);
    return { success: false, error: 'Unable to update password.' };
  }
}

export async function logoutAdmin(formData) {
  const csrfToken = formData instanceof FormData ? String(formData.get('csrfToken') || '') : formData?.csrfToken || '';
  const isValidCsrf = await validateCsrfToken(csrfToken);

  if (!isValidCsrf) {
    throw new Error('Invalid CSRF token');
  }

  const session = await getSession();
  if (session) {
    await deleteSession();
  }

  redirect('/admin/login');
}
