import {Methods, Routes} from 'redux/helpers/apiHelpers';

export type Response = {
  [key in Routes]?: {
    [key in Methods]?: {
      data: {data: any & {text: string}; success: number};
    };
  };
};

export class ResponseBuilder {
  private responses: Response[] = [];

  private add<T extends Response>(data: T) {
    this.responses.push(data);
    return this;
  }

  getBalance(walletBalance: number) {
    return this.add({
      getBalance: {
        GET: {data: {data: {walletBalance}, success: 200}},
      },
    });
  }

  postMarketOrder(orderID: string, price: number) {
    return this.add({
      order: {
        POST: {data: {data: {orderID, price}, success: 200}},
      },
    });
  }

  putTrailingOrder(price: number) {
    return this.add({
      order: {
        PUT: {data: {data: {price}, success: 200}},
      },
    });
  }

  postTrailingOrder(orderID: string, price: number) {
    return this.add({
      order: {
        POST: {data: {data: {orderID, price, text: 'best_order'}, success: 200}},
      },
    });
  }

  build(): Response {
    return Object.assign({}, ...this.responses);
  }
}
