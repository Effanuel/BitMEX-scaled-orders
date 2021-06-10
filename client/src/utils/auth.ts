import crypto from 'crypto';

export const authKeyExpires = (path: string, method: string) => {
  const api = process.env.REACT_APP___API_KEY || '';
  const secret = process.env.REACT_APP___API_SECRET || '';

  const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
  const signature = crypto
    .createHmac('sha256', secret)
    .update(method + path + expires)
    .digest('hex');

  return {op: 'authKeyExpires', args: [api, expires, signature]};
};
