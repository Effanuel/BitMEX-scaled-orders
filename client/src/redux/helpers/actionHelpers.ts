type ActionMap = {[key: string]: string};

export const REQUEST: ActionMap = {};
export const SUCCESS: ActionMap = {};
export const FAILURE: ActionMap = {};

export function registerApiActions(...names: string[]) {
  names.forEach((name) => {
    REQUEST[name] = `${name}_REQUEST`;
    SUCCESS[name] = `${name}_SUCCESS`;
    FAILURE[name] = `${name}_FAILURE`;
  });
}
