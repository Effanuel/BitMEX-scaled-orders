import {AppDriver} from './app-driver';

export type Inspector<Return> = (node: AppDriver<any>) => Return;

export function exists(testID: string): Inspector<boolean> {
  return (node) => !!node.getByID(testID);
}

export function textOf(testID: string): Inspector<string> {
  return (node) => {
    console.log(node.getByID(testID));
    return node.getText(testID);
  };
}

export function isDisabled(testID: string): Inspector<string> {
  return (node) => {
    const tree = node.getByID(testID);

    if (tree?.type !== 'button') {
      throw new Error(`${testID} is not a button/`);
    }
    return tree.props.disabled;
  };
}

export function countOf(testID: string): Inspector<number> {
  return (node) => node.getByID(testID)?.children?.length ?? 0;
}
