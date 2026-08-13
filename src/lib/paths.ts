/** Prefix an internal path with the site base (needed on GitHub Pages). */
export function withBase(path = '/'): string {
  const base = import.meta.env.BASE_URL || '/';
  const trimmed = path.replace(/^\/+/, '');
  if (!trimmed) {
    return base === '/' ? '/' : base.replace(/\/$/, '') || '/';
  }
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${trimmed}`;
}
