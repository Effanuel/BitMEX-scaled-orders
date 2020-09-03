import {Routes, AxiosData} from 'redux/helpers/apiHelpers';

type MockResponses = {[key in Routes]?: AxiosData};

export const mockResponses: MockResponses = {
  getBalance: {
    GET: {
      data: {
        data: {walletBalance: 1234567},
        success: 200,
      },
    },
  },
  order: {
    POST: {
      data: {
        data: {orderID: 'randomOrderId', price: 999},
        success: 200,
      },
    },
  },
};
