"use strict";

var assign           = Object.assign || require("object.assign");
var parseQueryString = require("./parse-query-string");

function ensureRoute(route) {

    if (typeof route !== "string") {
        throw new Error(
            "Expected route to be string, " +
            "but instead got: " + typeof route
        );
    }

    if (route.length === 0) {
        throw new Error(
            "Expected route not to be empty"
        );
    }
}

function matchRoute(routeRegEx, paramNames, route) {

    var curParamName;
    var i;
    var result;

    var matches = route.match(routeRegEx);

    if (! matches) {
        return null;
    }

    result = {};

    // param names matches starts from 1, since in 0 its the whole match
    for (i = 1; i < matches.length; i++) {
        curParamName = paramNames[i - 1];

        result[curParamName] = matches[i];
    }

    return result;
}

function parseRoute(route) {

    var partNameRegExStr = "([^\/\\s]+)";

    // add an additional group at the beginning to capture ":"
    var partRegEx = new RegExp("\/(:?)" + partNameRegExStr, "g");

    var parts = "";
    var paramNames = [];

    function replaceParamsWithRegEx(part, isParam, partName) {

        var replacement;

        parts += part;

        if (! isParam) {
            replacement = part;
        }
        else {
            paramNames.push(partName);
            replacement = "/" + partNameRegExStr;
        }

        return replacement;
    }

    var routeRegExStr = route.replace(partRegEx, replaceParamsWithRegEx);

    if (parts !== route) {
        throw new Error(
            "Expected route to be a group of parts, ",
            "but instead got: " + route
        );
    }

    return {
        routeRegEx: new RegExp("^" + routeRegExStr + "$"),
        paramNames: paramNames
    };
}

/**
 * @param  {String} route
 *
 * @return {Function}
 */
function createRouteMatcher(route) {

    ensureRoute(route);

    var parsed = parseRoute(route);

    return function(routeAndQuery) {

        var routeParams;

        ensureRoute(routeAndQuery);

        routeAndQuery = routeAndQuery.split("?");

        routeParams = matchRoute(
            parsed.routeRegEx,
            parsed.paramNames,
            routeAndQuery[0]
        );

        if (routeParams === null) {
            return null;
        }

        if (routeAndQuery.length === 1) {
            return routeParams;
        }

        return assign(routeParams, parseQueryString(routeAndQuery[1]));
    };
}

module.exports = createRouteMatcher;