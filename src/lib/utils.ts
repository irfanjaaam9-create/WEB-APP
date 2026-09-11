import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

export function formatUsd(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return 'Custom Quote';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function getWhatsAppLink(customMessage?: string, phoneNumber?: string): string {
  const phone = (phoneNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+8619712020155').replace(/[^\d+]/g, '');
  const message = customMessage || 'Hello Zahid, I am interested in sourcing products from China. I would like to discuss suppliers and pricing.';
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
