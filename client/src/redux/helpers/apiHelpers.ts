import axios from 'axios';
import _ from 'lodash/fp';
import {
  createMarketOrder,
  createOrder,
  amendOrder,
  MarketOrderProps,
  deleteOrder,
  ScaledOrders,
} from '../../util/index';
import {PostTrailingOrderProps} from 'redux/modules/trailing/trailingModule';

type RequestPayload<T> = {method?: string} & T;

export type RequestResponse = {data: obj; success: number};

export type Routes = 'bulkOrders' | 'order' | 'getBalance' | 'getOrders';
export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type BitMEX = ClassMethods<typeof BitMEX_API>;

export class BitMEX_API implements BitMEX {
  protected exchange = '/bitmex/';

  async _makeRequest<P>(path: Routes, payload: RequestPayload<P> | undefined): Promise<RequestResponse> {
    const response = await axios.post(path, payload);
    const {data, success} = response.data;
    return {data, success};
  }

  _parseData<D, Args extends string>(data: D, args: Args[] = []) {
    const parsedData: obj[] | obj = typeof data === 'string' ? JSON.parse(data) : data;
    const dataElement = !Array.isArray(parsedData) ? parsedData : parsedData[0];
    return _.pick([...args, 'text'], dataElement);
  }

  async sendRequest<P, Args extends string>(path: string, props: RequestPayload<P> | undefined, getData: Args[] = []) {
    const {data, success} = await this._makeRequest((this.exchange + path) as Routes, props);

    return {...this._parseData(data, getData), success};
  }

  async getBalance() {
    return await this.sendRequest('getBalance', undefined, ['walletBalance']);
  }

  async postTrailingOrder(props: PostTrailingOrderProps) {
    const order = createOrder(props);
    const payload = {order, method: 'POST'};

    return await this.sendRequest('order', payload, ['orderID', 'price']);
  }

  async putTrailingOrder(props: {orderID: string; price: number}) {
    const order = amendOrder(props);
    const payload = {order, method: 'PUT'};

    return await this.sendRequest('order', payload, ['price']);
  }

  async deleteTrailingOrder(props: {orderID: string}) {
    const order = deleteOrder(props);
    const payload = {order, method: 'DELETE'};

    return await this.sendRequest('order', payload);
  }

  async postMarketOrder(orderProps: MarketOrderProps) {
    const order = createMarketOrder(orderProps);
    const payload = {order, method: 'POST'};

    return await this.sendRequest('order', payload, ['orderID', 'price']);
  }

  async postBulkOrders(scaledOrders: ScaledOrders) {
    return await this.sendRequest('bulkOrders', scaledOrders);
  }
}
