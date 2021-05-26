// import main from "./js/main";
// const expect = require("chai").expect;
let calculatorFunctions = require("../js/calculatorFunctions.js")
let assert = require('assert');

describe("Sum", function() {   
    it("should return 5 when two numbers are added" , function() {
        assert(calculatorFunctions.handleSum(2,3),5);
    })

    describe("Sum Chained", function() {
        it("should return 7 when previously calculated number '5' is added to '2'" , function() {
            calculatorFunctions.currentResults = 5;
            assert(calculatorFunctions.handleSumChained(2), 7);
        });
        it("should return 7 when no previous numbers have been calculated", function() {
            calculatorFunctions.currentResults = 0;
            assert(calculatorFunctions.handleSumChained(7), 7);
        })
    });
})