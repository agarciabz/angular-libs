import { Predicate } from './predicates';

interface DefaultProperties<T> {
  currentValue: T;
  valueToCompare: T;
}

interface DateProperties {
  currentDate: Date;
  dateToCompare: Date;
}

export type ErrorDescription<P> = (P extends Date
  ? DateProperties
  : DefaultProperties<P>) & { predicate: Predicate };

const errorMessage = 'CrossFieldError';

type ErrorFieldMessage = typeof errorMessage;

type ErrorField<T> = `${string & T}${ErrorFieldMessage}`;

export type KeysOf<T> = keyof T & string;

export type CrossFieldValidatorError<T, P> = {
  [K in KeysOf<T> as `${ErrorField<K>}`]?: ErrorDescription<P>;
};

export const getErrorMessage = (controlName: string) =>
  `${controlName}${errorMessage}`;
