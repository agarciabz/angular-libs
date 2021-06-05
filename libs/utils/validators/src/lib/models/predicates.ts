enum PredicateEnum {
  EQUAL = 'Equal',
  NOT_EQUAL = 'NotEqual',
  GREATER_THAN = 'GreaterThan',
  GREATER_OR_EQUAL = 'GreaterOrEqual',
  LESS_THAN = 'LessThan',
  LESS_OR_EQUAL = 'LessOrEqual',
}

export type Predicate = `${PredicateEnum}`;

export type PredicateFnFactory<T> = {
  [K in Predicate]: (v1: T, v2: T) => boolean
}
