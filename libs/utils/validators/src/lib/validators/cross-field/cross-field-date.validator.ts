import { FormGroup, ValidatorFn } from '@ngneat/reactive-forms';
import { isAfter, isEqual, isBefore } from 'date-fns';

import {
  CrossFieldValidatorError,
  ErrorDescription,
  getErrorMessage,
  KeysOf,
} from '../../models/errors';
import { Predicate, PredicateFnFactory } from '../../models/predicates';

const predicateFnFactory: PredicateFnFactory<Date> = {
  Equal: isEqual,
  NotEqual: (d1: Date, d2: Date) => !isEqual(d1, d2),
  GreaterThan: isAfter,
  GreaterOrEqual: (d1: Date, d2: Date) => isEqual(d1, d2) || isAfter(d1, d2),
  LessThan: isBefore,
  LessOrEqual: (d1: Date, d2: Date) => isEqual(d1, d2) || isBefore(d1, d2),
};

export type CrossFieldDateValidatorError<T> = CrossFieldValidatorError<T, Date>;

export function crossFieldDatesValidator<T>(
  currentDateControlName: KeysOf<T>,
  dateToCompareControlName: KeysOf<T>,
  predicate: Predicate
): ValidatorFn<T, CrossFieldDateValidatorError<T>> {
  return (form: FormGroup<T>) => {
    const currentDate: Date = form.get(currentDateControlName).value;
    const dateToCompare: Date = form.get(dateToCompareControlName).value;
    if (!currentDate || !dateToCompare) {
      return null;
    }
    if (!predicateFnFactory[predicate](currentDate, dateToCompare)) {
      const errorDescription: ErrorDescription<Date> = {
        currentDate,
        dateToCompare,
        predicate,
      };
      return {
        [getErrorMessage(currentDateControlName)]: errorDescription,
      } as CrossFieldDateValidatorError<T>;
    }
    return null;
  };
}
