interface Action {
  readonly type: string;
  readonly payload?: any;
}

type unnull = undefined | null;

type iterobject<T = string> = {[key: string]: T};

type RequiredProperty<T> = {[P in keyof T]: Required<NonNullable<T[P]>>};
