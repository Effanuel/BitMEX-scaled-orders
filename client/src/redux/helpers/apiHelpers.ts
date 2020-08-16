import axios from 'axios';
import _ from 'lodash/fp';
import {
  createMarketOrder,
  createScaledOrders,
  ScaledOrdersProps,
  createOrder,
  amendOrder,
  MarketOrderProps,
} from 'util/index';
import {PostTrailingOrderProps} from 'redux/modules/trailing';

export interface BitMEX {
  getBalance: () => any;
  postMarketOrder: (payload: MarketOrderProps) => any;
  postTrailingOrder: (payload: PostTrailingOrderProps) => any;
  putTrailingOrder: (payload: {orderID: string; price: number}) => any;
  postBulkOrders: (payload: ScaledOrdersProps) => any;
}

export class BitMEX_API implements BitMEX {
  private exchange = '/bitmex/';

  private async _makeRequest<P>(path: string, payload: P) {
    const response = await axios.post(path, payload);
    const {data, success} = response.data;
    return {data, success};
  }

  private _parseData(data: any, args: string[] = []) {
    const parsedData = JSON.parse(data);
    const dataElement = !Array.isArray(parsedData) ? parsedData : parsedData[0];
    return _.pick([...args, 'text'], dataElement);
  }

  private async sendRequest<P>(path: string, props: P, getData: string[] = []) {
    const {data, success} = await this._makeRequest(this.exchange + path, props);

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
