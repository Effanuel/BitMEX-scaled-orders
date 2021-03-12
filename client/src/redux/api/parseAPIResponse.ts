import _ from 'lodash/fp';
import {APIType} from './api';

const ALL_FIELDS = '_ALL_FIELDS_';

type RelevantData<K extends string> = {[key in K]: {keys?: string[] | typeof ALL_FIELDS; isArray?: boolean}};
const apiParsingOptions: Partial<RelevantData<keyof APIType>> = {
  getBalance: {
    keys: ['walletBalance'],
  },
  limitOrder: {
    keys: ['orderID', 'price'],
  },
  orderAmend: {
    keys: ['price'],
  },
  getOpenOrders: {
    keys: ALL_FIELDS,
    isArray: true,
  },
  orderCancel: {
    keys: ['orderID'],
  },
  marketOrder: {
    keys: ALL_FIELDS,
  },
  profitTargetOrder: {
    keys: ALL_FIELDS,
  },
};

const commonKeys = ['text'];

export function parseData<K extends string>(parsingOptions: Partial<RelevantData<K>>) {
  return (method: K) => {
    return ({data}: {data: string}) => {
      //TODO: make this safer
      const parsedData: obj[] | obj = JSON.parse(data);
      const {keys = [], isArray = false} = parsingOptions?.[method] ?? {};

      const dataElement = !Array.isArray(parsedData) || isArray ? parsedData : parsedData?.[0];
      return keys === ALL_FIELDS ? dataElement : {..._.pick([...keys, ...commonKeys], dataElement ?? {})};
    };
  };
}

export default parseData(apiParsingOptions);
