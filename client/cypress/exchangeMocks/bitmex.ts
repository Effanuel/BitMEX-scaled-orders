export default class bitmex {
  basePath = 'bitmex';
  method = 'POST';

  getBalance(walletBalance: number) {
    return this._makeResponse({walletBalance, text: 'text123'}, 'getBalance');
  }

  bulkOrders() {
    return this._makeResponse({text: 'order'}, 'bulkOrders');
  }

  private _makeResponse(data: Record<string, unknown>, url: string) {
    return {
      url: `/${this.basePath}/${url}`,
      method: this.method,
      response: {
        success: 200,
        data: JSON.stringify(data),
      },
    };
  }
}
