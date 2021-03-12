//@ts-nocheck

export type Constructor<T = {}, Args extends any[] = any[]> = new (...args: Args) => T;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type MergeConstructorTypes<Args extends any[], T extends Array<Constructor<any, Args>>> = UnionToIntersection<
  InstanceType<T[number]>
>;

export type MixinConstructors<Args extends any[], M extends any[]> = Constructor<MergeConstructorTypes<Args, M>>;

interface Mix<T extends any[], S, Args extends any[]> {
  with: (...constructors: T) => MixinConstructors<Args, T> & S;
}

// export const Mixin = <A, Args extends any[], C extends Constructor, T extends Constructor<A & C, Args>[]>(
//     c: C,
//   ): Mix<T, C, Args> => {
//     return {
//       with: (...constructors: T) => {
//         constructors.forEach((Class) => {
//           Object.getOwnPropertyNames(Class.prototype).forEach((prop) => {
//             Object.assign(c.prototype, {[prop]: Class.prototype[prop]});
//           });
//         });
//         return c; //as Constructor<MergeConstructorTypes<Args, T>> & C;
//       },
//     };
//   };

export const Mixin = <Args extends any[], C, T extends Constructor<T & C, Args>[]>(c: C): Mix<T, C, Args> => {
  return {
    with: (...constructors: Constructor<T & C, Args>[]) => {
      constructors.forEach((Class) => {
        Object.getOwnPropertyNames(Class.prototype).forEach((prop) => {
          Object.assign(c.prototype, {[prop]: Class.prototype[prop]});
        });
      });
      return c; //as Constructor<MergeConstructorTypes<Args, T>> & C;
    },
  };
};
