import {RenderedNode} from 'react-component-driver';
import {toast} from 'react-toastify';
import {MockBitMEX_API} from './mockAPI';

export type SpyModule<K extends any[]> = {
  [key: string]: {spy: jest.SpyInstance<void, K>; parser?: (value: K) => K[number][keyof K]};
};

export function toastSpyModule(): SpyModule<RenderedNode[]> {
  const spy = (toast as unknown) as jest.SpyInstance<void, RenderedNode[]>;
  return {toast: {spy, parser: (value) => value[0].props}};
}

export function apiSpyModule(): SpyModule<RenderedNode[]> {
  const spy: any = jest.spyOn(MockBitMEX_API.prototype, 'sendRequest');
  return {api: {spy}};
}
