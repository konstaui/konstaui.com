import path from 'path';

export const getDirname = (url) => {
  return path.dirname(new URL(url).pathname);
};
