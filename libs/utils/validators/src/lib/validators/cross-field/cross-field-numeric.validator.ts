import { FormGroup, ValidatorFn } from '@ngneat/reactive-forms';
import {
  CrossFieldValidatorError,
  ErrorDescription,
  getErrorMessage,
  KeysOf,
} from '../../models/errors';
import { Predicate, PredicateFnFactory } from '../../models/predicates';

const predicateFnFactory: PredicateFnFactory<number> = {
  Equal: (n1, n2) => n1 === n2,
  NotEqual: (n1, n2) => n1 !== n2,
  GreaterOrEqual: (n1, n2) => n1 >= n2,
  GreaterThan: (n1, n2) => n1 > n2,
  LessOrEqual: (n1, n2) => n1 <= n2,
  LessThan: (n1, n2) => n1 < n2,
};

export type CrossFieldNumericValidatorError<T> = CrossFieldValidatorError<
  T,
  number
>;

export function crossFieldNumericValidator<T>(
  currentValueControlName: KeysOf<T>,
  valueToCompareControlName: KeysOf<T>,
  predicate: Predicate
): ValidatorFn<T, CrossFieldNumericValidatorError<T>> {
  return (form: FormGroup<T>) => {
    const currentValue: number = form.get(currentValueControlName).value;
    const valueToCompare: number = form.get(valueToCompareControlName).value;
    if (!currentValue || !valueToCompare) {
      return null;
    }
    if (!predicateFnFactory[predicate](currentValue, valueToCompare)) {
      const errorDescription: ErrorDescription<number> = {
        currentValue,
        valueToCompare,
        predicate,
      };
      return {
        [getErrorMessage(currentValueControlName)]: errorDescription,
      } as CrossFieldNumericValidatorError<T>;
    }
    return null;
  };
}
