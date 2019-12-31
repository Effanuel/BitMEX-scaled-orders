import crypto from "crypto";
import rq from "request-promise";

import { ErrorHandler } from "./error";

export const generate_requestOptions = (
  data: any,
  path: string,
  method: string,
  url: string
) => {
  //path_leverage = '/api/v1/position/leverage', //POST /position/leverage
  const api = "1E5P1k729gIzpWCDgZnJW_8p"; //p
  const secret = "Axwo9PFB2oLotENXKKJowTP-vDXGbZUkwIt8Fiqfrh64MHWV";

  let expires = Math.round(new Date().getTime() / 1000) + 60; // 1 min in the future
  let postBody = JSON.stringify(data);
  let signature = crypto
    .createHmac("sha256", secret)
    .update(method + `/api/v1/${path}` + expires + postBody)
    .digest("hex");

  let headers = {
    "content-type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "api-expires": expires,
    "api-key": api,
    "api-signature": signature
  };
  //console.log(`https://${true ? "testnet" : "www"}.bitmex.com${path}`);
  return {
    headers: headers,
    url: url,
    method: method,
    body: postBody
  };
};

export const _curl_bitmex = async (
  path: any,
  postdict: any,
  verb?: any,
  query?: any,
  rethrow_errors?: any,
  max_retries: any = null
) => {
  const url = `https://testnet.bitmex.com/api/v1/${path}`;

  if (!verb) verb = postdict ? "POST" : "GET";

  if (max_retries) {
    max_retries = ["POST", "PUT"].includes(verb) ? 0 : 3;
  }

  let response = null;
  const requestOptions = generate_requestOptions(postdict, path, verb, url);
  try {
    console.log("sending request");
    const respon = await rq(requestOptions);
    const result = response;
    console.log(respon.statusCode);
    return respon;
  } catch (error) {
    throw ErrorHandler(error);
  }
};
