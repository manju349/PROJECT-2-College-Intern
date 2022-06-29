const isValidField = function (value){
    if ( typeof value === 'undefined'  || value === null) return false;
    if ( typeof value === 'string' && value.trim().length === 0 ) return false;
    return true
}

const isValidRequestBody = function (requestBody){
    return Object.keys(requestBody).length > 0
}

const isValidURL = function (link){
    let URLRegex = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
    return (URLRegex.test(link))
}

const isValidMobile = function (mobile){
    return (/[0-9]{10}/.test(mobile))
}

const isValidEmail = function (email){
    return (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
}

const isValidPassword = function (password){
    return (/[a-z A-Z 0-9]{8,16}/.test(password))
}

module.exports= {isValidField,isValidRequestBody,isValidURL,isValidMobile, isValidEmail, isValidPassword }