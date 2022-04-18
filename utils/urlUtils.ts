import stringHash from 'string-hash';

export const cleanUrl = (url: string): string => {
  const parsedUrl = new URL(url);
  const cleanUrl = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;
  return cleanUrl;
};

export const getHostFromUrl = (url: string): string => {
  const parsedUrl = new URL(url);
  return parsedUrl.host;
};

export const getHashOfUrl = (url: string): string => {
  return stringHash(cleanUrl(url));
};
