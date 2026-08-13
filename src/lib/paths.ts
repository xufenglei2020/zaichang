/** Prefix an internal path with the site base (needed on GitHub Pages). */
export function withBase(path = '/'): string {
  const base = import.meta.env.BASE_URL || '/';
  const trimmed = path.replace(/^\/+/, '').replace(/\/+$/, '');
  const prefix = base.endsWith('/') ? base : `${base}/`;
  if (!trimmed) {
    return prefix === '//' ? '/' : prefix;
  }
  const looksLikeFile = /\.[a-zA-Z0-9]+$/.test(trimmed);
  return looksLikeFile ? `${prefix}${trimmed}` : `${prefix}${trimmed}/`;
}
