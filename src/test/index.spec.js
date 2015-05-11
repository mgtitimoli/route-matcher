"use strict";

var expect             = require("chai").expect;
var createRouteMatcher = require("../main/index");

describe("createRouteMatcher", function() {

    it("should throw an error on a non string route", function() {

        var route;

        expect(createRouteMatcher.bind(undefined, route)).to.throw(Error);
    });

    it("should throw an error on an empty route", function() {

        var route = "";

        expect(createRouteMatcher.bind(undefined, route)).to.throw(Error);
    });

    it("should throw an error on a malformed route", function() {

        var route = "/this is not a/route";

        expect(createRouteMatcher.bind(undefined, route)).to.throw(Error);
    });

    it("should return a route matcher (function) on a valid route", function() {

        var route = "/this/is/a/:valid/:route";

        expect(createRouteMatcher.bind(undefined, route)).to.be.a("function");
    });

    describe("routeMatcher", function() {

        it("should return null in case it has not matched", function() {

            var routeToMatch  = "/p1/p2";
            var routeReceived = "/this/is/different";
            var routeMatcher  = createRouteMatcher(routeToMatch);
            var actual        = routeMatcher(routeReceived);

            expect(actual).to.be.null;
        });

        it("should return an empty object in case has matched and route has no named param", function() {

            var routeToMatch  = "/p1/p2";
            var routeReceived = "/p1/p2";
            var routeMatcher  = createRouteMatcher(routeToMatch);
            var actual        = routeMatcher(routeReceived);
            var expected      = {};

            expect(actual).to.be.eql(expected);
        });

        it("should return an object with keys/values (received route), in case route has matched and has named params", function() {

            var routeToMatch  = "/p1/:p2/p3/:p4";
            var routeReceived = "/p1/two/p3/four";
            var routeMatcher  = createRouteMatcher(routeToMatch);
            var actual        = routeMatcher(routeReceived);
            var expected      = {
                p2: "two",
                p4: "four"
            };

            expect(actual).to.be.eql(expected);
        });

        it("should return an object with keys/values (query string), in case route has matched and has no named params", function() {

            var routeToMatch  = "/p1/p2/p3/p4";
            var routeReceived = "/p1/p2/p3/p4?param1=value1&param2=value2";
            var routeMatcher  = createRouteMatcher(routeToMatch);
            var actual        = routeMatcher(routeReceived);
            var expected      = {
                param1: "value1",
                param2: "value2"
            };

            expect(actual).to.be.eql(expected);
        });

        it("should return an object with keys/values (received route and query string), in case route has matched and has named params", function() {

            var routeToMatch  = "/p1/:p2/p3/:p4";
            var routeReceived = "/p1/two/p3/four?param1=value1&param2=value2";
            var routeMatcher  = createRouteMatcher(routeToMatch);
            var actual        = routeMatcher(routeReceived);
            var expected      = {
                p2    : "two",
                p4    : "four",
                param1: "value1",
                param2: "value2"
            };

            expect(actual).to.be.eql(expected);
        });
    });
});