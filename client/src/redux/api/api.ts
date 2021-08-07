import {Exchange} from 'redux/modules/settings/types';
import {BitmexBlock} from './bitmex/bitmex-block';

export type APIType = ClassMethods<typeof APIFacade>;

export type AvailableMethods = APIFacade['BitmexBlock'];

type GetQuery = <K extends keyof BitmexBlock>(method: K) => BitmexBlock[K];

export class APIFacade implements APIType {
  private BitmexBlock: BitmexBlock = new BitmexBlock();

  getQuery(exchange: Exchange): GetQuery {
    return (method) => {
      switch (exchange) {
        case Exchange.BitMeX:
          return this.BitmexBlock[method];
        case Exchange.BitMeXTEST:
          return this.BitmexBlock[method];
      }
    };
  }
}

export type MethodNames = KeysByType<APIFacade, Function>;
export type MethodProps = Parameters<ClassMethods<typeof APIFacade>[MethodNames]>[number];

export type MockedMethods = {
  [key in keyof AvailableMethods]: {props: any; result: any};
}[];
