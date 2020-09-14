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
        data: {orderID: '572fe645-91c8-1a47-5060-18f11630f38a', price: 10321.5, text: 'best_order'}, // TODO SEPARATE RESPONSES
        success: 200,
      },
    },
  },
};
