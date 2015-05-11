"use strict";

var expect           = require("chai").expect;
var parseQueryString = require("../main/parse-query-string");

describe("parseQueryString", function() {

    it("should return an empty object on empty query string", function() {

        var queryString = "";

        var actual   = parseQueryString(queryString);
        var expected = {};

        expect(actual).to.be.eql(expected);
    });

    it("should return an object with keys and values of the query string", function() {

        var queryString = "k1=value1&k2=value2";

        var actual   = parseQueryString(queryString);
        var expected = {
            k1: "value1",
            k2: "value2"
        };

        expect(actual).to.be.eql(expected);
    });

    it("should return an object with values undefined on each query item with no value present", function() {

        var queryString = "k1=value1&k2&k3";

        var actual   = parseQueryString(queryString);
        var expected = {
            k1: "value1",
            k2: undefined,
            k3: undefined
        };

        expect(actual).to.be.eql(expected);
    });

    it("should return an object with array values on repeated or array query items", function() {

        var queryString = "k1[]=value1&k2&k2&k3=value3.1&k3=value3.2";

        var actual   = parseQueryString(queryString);
        var expected = {
            k1: [ "value1" ],
            k2: [ undefined, undefined ],
            k3: [ "value3.1", "value3.2" ]
        };

        expect(actual).to.be.eql(expected);
    });
});