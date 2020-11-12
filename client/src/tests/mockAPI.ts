import {BitMEX_API, Methods, Routes} from '../redux/helpers/apiHelpers';
import {Response} from './responses';

type RequestPayload<T> = {method?: Methods} & T;

// @TODO fix async not async type
export class MockBitMEX_API extends BitMEX_API {
  constructor(private mockResponsesOverride: Partial<Response>) {
    super();
    this.mockResponsesOverride = mockResponsesOverride;
  }

  async _makeRequest<P>(path: Routes, payload: RequestPayload<P> | undefined) {
    const response = this.mockResponsesOverride[path]?.[payload?.method || 'GET'];
    const {data, success} = response!.data;
    return {data, success};
  }
  // @ts-ignore
  async sendRequest<P = any>(path: string, props: RequestPayload<P> | undefined, getData: string[] = []) {
    const {data, success} = await this._makeRequest(path as Routes, props);

    return {...this._parseData(data, getData), success};
  }
}
