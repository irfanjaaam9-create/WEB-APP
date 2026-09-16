export function getCsrfCookieValue() {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/(?:^|; )csrf_token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : '';
}

export function setCsrfCookie(token) {
  if (typeof document === 'undefined') return;
  const isProd = process.env.NODE_ENV === 'production';
  document.cookie = `csrf_token=${encodeURIComponent(token)}; path=/; sameSite=lax; ${isProd ? 'secure;' : ''} max-age=28800`;
}

export function ensureCsrfToken() {
  if (typeof document === 'undefined') return '';

  let token = getCsrfCookieValue();
  if (!token) {
    token = Array.from(crypto.getRandomValues(new Uint8Array(24)))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
    setCsrfCookie(token);
  }

  return token;
}

export function verifyCsrfToken(value, expected) {
  if (!value || !expected) return false;
  return value === expected;
}
