export type Prettify<T> = {
  [k in keyof T]: T[k];
} & unknown;
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
