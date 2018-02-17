/**
 * Created by milad on 2/14/18.
 */
export const fillRequired = (val) => {
  return val.length !== 0;
};

export const isNumber = val => {
  return /^\d+$/.test(val);
};

export const isNationalCode = val => {
  return val.length === 10 && /^\d{10}$/.test(val);
};

export const passwordStrong = val => {
  return val.length >= 5 && /([a-zA-Z _$#@%^&*!]*\d+[a-zA-Z _$#@%^&*!]+|[a-zA-Z _$#@%^&*!]+\d+[a-zA-Z _$#@%^&*!]*|\d+[a-zA-Z _$#@%^&*!]*)+/.test(val);
};