import {AppDriver} from './app-driver';

export type Inspector<Return> = (node: AppDriver<any>) => Return;

export function exists(testID: string): Inspector<boolean> {
  return (node) => !!node.getByID(testID);
}

export function countOf(testID: string): Inspector<number> {
  return (node) => node.getByID(testID)?.children?.length ?? 0;
}
