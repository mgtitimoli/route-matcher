"use strict";

// Take a look to http://jsperf.com/parse-url-query-string

var paramArrayIndicator = require("./param-array-indicator");

function addParamTo(result, encodedKey, encodedValue) {

    var PARAM_NO_VALUE; // undefined

    var key   = decodeURIParam(encodedKey);
    var value = (encodedValue)?
        decodeURIParam(encodedValue) :
        PARAM_NO_VALUE;

    var isArrayParam = paramArrayIndicator.isPresentOn(key);

    if (isArrayParam) {
        key = paramArrayIndicator.removeFrom(key);
    }

    if (! result.hasOwnProperty(key)) {
        result[key] = (isArrayParam)?
            [ value ] :
            value;
    }
    else {
        // convert previous value to array
        if (! Array.isArray(result[key])) {
            result[key] = [ result[key] ];
        }

        result[key].push(value);
    }
}

function decodeURIParam(encodedParam) {

    // allows params with "+" (space indicator)
    return decodeURIComponent(encodedParam.replace(/\+/g, "%20"));
}

function parseQueryStringRE(queryString) {

    var match;
    var qsParamRegEx = /([^&=]+)(?:=([^&=]+))?/g;

    var result = {};

    while (match = qsParamRegEx.exec(queryString)) {
        addParamTo(
            result,
            match[1], // key
            match[2]  // value
        );
    }

    return result;
}

module.exports = parseQueryStringRE;