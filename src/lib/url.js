/** Prefix a site-relative path with the configured base path. */
export function u(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
export const monthUrl = (month, year = 2027) => u(`/calendar/${year}/${String(month).padStart(2, '0')}/`);
export const saintUrl = (slug) => u(`/saints/${slug}/`);
