// Email pattern regex from https://emailregex.com/
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const isNullOrUndefined = (val) => (val === undefined || val === null);
export const isString = (val) => typeof val === 'string';
export const isNumber = (val) => typeof val === 'number';
export const isFunction = (val) => typeof val === 'function';

export const isValidString = (val) => {
  const isStringOrNumber = isString(val) || isNumber(val);

  if (!isStringOrNumber) {
    return false;
  }
  return isString(val) ? val.trim() !== '' : true;
}

export const isValidEmail = (val) => emailRegex.test(val);