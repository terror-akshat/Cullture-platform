import { API_BASE_URL } from '../config';

const MEDIA_BASE_URL = API_BASE_URL.replace(/\/api$/, '');

export function getMediaUrl(rawUrl) {
  if (!rawUrl) {
    return '';
  }

  if (/^https?:\/\//i.test(rawUrl) || rawUrl.startsWith('blob:') || rawUrl.startsWith('data:')) {
    return rawUrl;
  }

  return `${MEDIA_BASE_URL}${rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`}`;
}
