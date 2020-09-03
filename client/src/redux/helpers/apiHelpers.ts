import axios from 'axios';
import _ from 'lodash/fp';
import {
  createMarketOrder,
  createScaledOrders,
  ScaledOrdersProps,
  createOrder,
  amendOrder,
  MarketOrderProps,
  deleteOrder,
} from 'util/index';
import {PostTrailingOrderProps} from 'redux/modules/trailing';

type RequestPayload<T> = {method?: string} & T;

export type AxiosData = {[key: string]: any};

export type Routes = 'bulkOrders' | 'order' | 'getBalance' | 'getOrders';
export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface BitMEX {
  sendRequest: (path: Routes, payload: RequestPayload<P> | undefined) => Promise<any>;
  getBalance: () => Promise<any>;
  postMarketOrder: (payload: MarketOrderProps) => Promise<any>;
  postTrailingOrder: (payload: PostTrailingOrderProps) => Promise<any>;
  putTrailingOrder: (payload: {orderID: string; price: number}) => Promise<any>;
  deleteTrailingOrder: (payload: {orderID: string}) => Promise<any>;
  postBulkOrders: (payload: ScaledOrdersProps) => Promise<any>;
}

export class BitMEX_API implements BitMEX {
  protected exchange = '/bitmex/';

  async _makeRequest<P>(path: Routes, payload: RequestPayload<P> | undefined): Promise<AxiosData> {
    const response = await axios.post(path, payload);
    const {data, success} = response.data;
    return {data, success};
  }

  _parseData(data: any, args: string[] = []) {
    const parsedData = JSON.parse(data);
    const dataElement = !Array.isArray(parsedData) ? parsedData : parsedData[0];
    return _.pick([...args, 'text'], dataElement);
  }

  async sendRequest<P>(path: string, props: RequestPayload<P> | undefined, getData: string[] = []) {
    const {data, success} = await this._makeRequest((this.exchange + path) as Routes, props);

    return {...this._parseData(data, getData), success};
  }

  getBalance = async () => {
    return await this.sendRequest('getBalance', undefined, ['walletBalance']);
  };

  postTrailingOrder = async (props: PostTrailingOrderProps) => {
    const order = createOrder(props);
    const payload = {order, method: 'POST'};

    return await this.sendRequest('order', payload, ['orderID', 'price']);
  };

  putTrailingOrder = async (props: {orderID: string; price: number}) => {
    const order = amendOrder(props);
    const payload = {order, method: 'PUT'};

    return await this.sendRequest('order', payload, ['price']);
  };

  deleteTrailingOrder = async (props: {orderID: string}) => {
    const order = deleteOrder(props);
    const payload = {order, method: 'DELETE'};

    return await this.sendRequest('order', payload);
  };

  postMarketOrder = async (orderProps: MarketOrderProps) => {
    const order = createMarketOrder(orderProps);
    const payload = {order, method: 'POST'};

    return await this.sendRequest('order', payload, ['orderID', 'price']);
  };

  postBulkOrders = async (payload: ScaledOrdersProps) => {
    const scaledOrders = createScaledOrders(payload);
    if (payload.ordersProps.stop) {
      scaledOrders.orders.push(scaledOrders.stop as any);
    }

    return await this.sendRequest('bulkOrders', scaledOrders);
  };
}
