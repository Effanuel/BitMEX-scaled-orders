import crypto from 'crypto';
import rq from 'request-promise';
import {logger} from './logger';

import {ErrorHandler} from './error';

export const generate_requestOptions = (data: any = '', path: string, method: string, url: string): any => {
  //path_leverage = '/api/v1/position/leverage', //POST /position/leverage
  const api = process.env.REACT_APP___API_KEY || '';
  const secret = process.env.REACT_APP___API_SECRET || '';

  const expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
  const postBody = data ? JSON.stringify(data) : '';
  const signature = crypto
    .createHmac('sha256', secret)
    .update(method + `/api/v1/${path}` + expires + postBody)
    .digest('hex');

  const headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'api-expires': expires,
    'api-key': api,
    'api-signature': signature,
  };
  return {
    headers: headers,
    url: url,
    method: method,
    body: postBody,
  };
};

export const _curl_bitmex = async (path: any, verb?: any, postdict?: any, max_retries: any = null): Promise<any> => {
  const url = `https://${process.env.REACT_APP___TESTNET == 'true' ? 'testnet' : 'www'}.bitmex.com/api/v1/${path}`;

  if (!verb) verb = postdict ? 'POST' : 'GET';

  if (max_retries) {
    max_retries = ['POST', 'PUT'].includes(verb) ? 0 : 3;
  }

  // let response = null;
  const requestOptions = generate_requestOptions(postdict, path, verb, url);
  try {
    logger.log('debug', `Sending request from _curl_bitmex(${path})...`);
    const response = await rq(requestOptions);
    return response;
  } catch (error) {
    throw ErrorHandler(error);
  }
};
