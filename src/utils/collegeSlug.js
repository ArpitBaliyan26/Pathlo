export function slugifyCollegeName(name = '') {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCollegeSlug(college) {
  return slugifyCollegeName(college?.name || 'college');
}

export function findCollegeByRouteKey(colleges, routeKey) {
  if (!routeKey) return null;

  const byId = colleges.find((entry) => entry.id === routeKey);
  if (byId) return byId;

  return colleges.find((entry) => getCollegeSlug(entry) === routeKey) || null;
}
