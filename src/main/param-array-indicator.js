"use strict";

var indicator = "[]";

var indicatorRegEx = /\[\]$/g;

function get() {

    return indicator;
}

function isPresentOn(paramKey) {

    return indicatorRegEx.test(paramKey);
}

function removeFrom(paramKey) {

    return paramKey.replace(indicatorRegEx, "");
}

module.exports = {
    get        : get,
    isPresentOn: isPresentOn,
    removeFrom : removeFrom
};
