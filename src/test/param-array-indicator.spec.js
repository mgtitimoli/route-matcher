"use strict";

var expect              = require("chai").expect;
var paramArrayIndicator = require("../main/param-array-indicator");

describe("paramArrayIndicator", function() {

    describe(".isPresentOn", function() {

        it("should return true if array indicator is present on param key", function() {

            var paramKey = "key" + paramArrayIndicator.get();
            var actual   = paramArrayIndicator.isPresentOn(paramKey);

            expect(actual).to.be.true;
        });

        it("should return false if array indicator is not present on param key", function() {

            var paramKey = "key";
            var actual   = paramArrayIndicator.isPresentOn(paramKey);

            expect(actual).to.be.false;
        });
    });

    describe(".removeFrom", function() {

        it("should remove array indicator from param key if it is present on it", function() {

            var expected = "key";
            var paramKey = expected + paramArrayIndicator.get();
            var actual   = paramArrayIndicator.removeFrom(paramKey);

            expect(actual).to.be.eql(expected);
        });

        it("should return param key unchanged if array indicator is not present on it", function() {

            var paramKey = "key";
            var actual   = paramArrayIndicator.removeFrom(paramKey);
            var expected = paramKey;

            expect(actual).to.be.eql(expected);
        });
    });
})