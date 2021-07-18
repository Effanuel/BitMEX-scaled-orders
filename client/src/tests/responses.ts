import {AvailableMethods} from 'redux/api/api';

export type ForgedResponse = {
  [K in keyof AvailableMethods]: {apiMethod: K; props: Parameters<AvailableMethods[K]>[number]; result: any};
}[keyof AvailableMethods];

export const forgeResult = <R>(data: R) => ({data: {data: JSON.stringify(data), statusCode: 200}});

export const forgeMarketOrder = (data: any) => forgeResult(data);

export const forgeLimitOrder = (data: any) => forgeResult(data);

export const forgeAmendOrder = (data: any) => forgeResult(data);

export const forgeOpenOrders = (data: any) => forgeResult(data);

export const forgeOrderCancel = (data: any) => forgeResult(data);

export const forgeOrderCancelAll = (data: any) => forgeResult(data);

export const forgeProfitTargetOrder = (data: any) => forgeResult(data);
