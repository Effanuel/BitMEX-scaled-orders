import {BitMEX_API, Routes} from 'redux/helpers/apiHelpers';
import {mockResponses} from './mockData/requestResponses';

type RequestPayload<T> = {method?: string} & T;

export class MockBitMEX_API extends BitMEX_API {
  constructor() {
    super();
  }

  async _makeRequest<P>(path: Routes, payload: RequestPayload<P> | undefined) {
    const response = mockResponses[path]?.[payload?.method || 'GET'];
    const {data, success} = response!.data;
    return {data, success};
  }

  async sendRequest<P = any>(path: string, props: RequestPayload<P> | undefined, getData: string[] = []) {
    const {data, success} = await this._makeRequest(path as Routes, props);

    return {...this._parseData(data, getData), success};
  }
}
