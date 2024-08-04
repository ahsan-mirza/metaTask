import { IncomingMessage, ServerResponse } from 'http';
import cookie from 'cookie';

export const setCookie = (
  res: ServerResponse,
  name: string,
  value: string,
  options: cookie.CookieSerializeOptions = {}
) => {
  const opts: cookie.CookieSerializeOptions = {
    path: '/',
    ...options,
  };
  res.setHeader('Set-Cookie', cookie.serialize(name, value, opts));
};

export const getCookie = (req: IncomingMessage, name: string): string | undefined => {
  const cookies = cookie.parse(req.headers.cookie || '');
  return cookies[name];
};