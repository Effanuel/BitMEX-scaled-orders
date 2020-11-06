interface Action {
  readonly type: string;
  readonly payload?: any;
}

type obj = Record<string, unknown>;

type unnull = undefined | null;

type iterobject<T = string> = {[key: string]: T};

type RequiredProperty<T> = {[P in keyof T]: Required<NonNullable<T[P]>>};

type ValueOf<T> = T[keyof T];

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

type PickWithOptional<T, K extends keyof T, O extends keyof T> = {
  [P in K]: T[P];
} &
  {[P in O]?: T[P]};

type KeysByType<O extends object, T> = {
  [k in keyof O]-?: O[k] extends T ? k : never;
}[keyof O];

type FunctionsOnly<O extends object> = Pick<O, KeysByType<O, Function>>;

type ClassMethods<C extends object> = FunctionsOnly<InstanceType<C>>;

type InputChange = React.ChangeEvent<HTMLInputElement>;
type ButtonChange = React.ChangeEvent<HTMLButtonElement>;
type MouseChange = React.MouseEvent<HTMLButtonElement>;
