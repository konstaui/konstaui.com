export const slugify = (string) => {
  return string
    .trim()
    .replace(/[ '"\-_=+\.,:;&]/g, '-')
    .replace(/[-]{2,}/g, '-')
    .toLowerCase();
};
