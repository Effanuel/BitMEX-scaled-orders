interface Action {
  readonly type: string;
  readonly payload?: any;
}

type unnull = undefined | null;

type iterobject<T = string> = {[key: string]: T};

type RequiredProperty<T> = {[P in keyof T]: Required<NonNullable<T[P]>>};

type ValueOf<T> = T[keyof T];

type PickWithOptional<T, K extends keyof T, O extends keyof T> = {
  [P in K]: T[P];
} &
  {[P in O]?: T[P]};

type InputChange = React.ChangeEvent<HTMLInputElement>;
type ButtonChange = React.ChangeEvent<HTMLButtonElement>;
