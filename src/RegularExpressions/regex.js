export  const regex = { 
    digitWithdecimal : new RegExp(/^\d+(\.\d{1,2})?$/),
    phoneNumber : new RegExp(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/),
    usPhoneFormat : new RegExp(/^\(\d{3}\)\s?\d{3}-\d{4}$/),
    onlyNumber : new RegExp(/^[0-9]*$/),
    zipCode : new RegExp(/^[0-9]{5}$/),
    alphaNumeric:new RegExp("^[a-zA-Z0-9]{12}$") // limit 12 digit

}