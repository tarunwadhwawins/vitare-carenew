export const regex = {
  digitWithdecimal: new RegExp(/^\d+(\.\d{1,2})?$/),
  phoneNumber: new RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/),
  usPhoneFormat: new RegExp(/^\(\d{3}\)\s?\d{3}-\d{4}$/),
  onlyNumber: new RegExp(/^[0-9]*$/),
  extension: new RegExp(/^[0-9]{4}$/),
  height: new RegExp(/^(\d{1,2})[']?((\d)|([0-1][0-2]))?["]?$/),
  zipCode: new RegExp(/^[0-9]{5}$/),
  alphaNumeric: new RegExp('^[a-zA-Z0-9]{12}$'), // limit 12 digit
  emailValidation: new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
};
