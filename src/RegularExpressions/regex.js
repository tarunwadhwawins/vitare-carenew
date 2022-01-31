export  const regex = { 
    digitWithdecimal : new RegExp(/^\d+(\.\d{1,2})?$/),
    phoneNumber : new RegExp(/^[0-9]{10}$/),
    onlyNumber : new RegExp(/^[0-9]*$/),
    zipCode : new RegExp(/^[0-9]{5}$/),

}