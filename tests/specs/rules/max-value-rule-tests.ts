import {expect} from "chai";
import {MaxValueValidationRule} from "../../../src/rules/max-value-validation-rule";
import {PropertyResolver} from "property-resolver";
import {ModelHelper} from "../../../src/model-helper";

describe("Validation Rules", function(){
    describe('Max Value Rule', function () {

        var modelHelper = new ModelHelper(new PropertyResolver(), { null:null });


        it('should be valid when number is <= max length', function (done) {
            var rule = new MaxValueValidationRule();
            modelHelper.model.validNumber = 10;
            rule.validate(modelHelper,'validNumber', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when string number is <= max value', function (done) {
            var rule = new MaxValueValidationRule();
            modelHelper.model.validNumberString = "10";
            rule.validate(modelHelper,'validNumberString', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when date is <= max date', function (done) {
            var rule = new MaxValueValidationRule();
            var maximumDate = new Date(2000, 1, 1);
            modelHelper.model.validDate = new Date(1990, 1, 1);
            rule.validate(modelHelper,'validDate', maximumDate).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be valid when provided a null value', function (done) {
            var rule = new MaxValueValidationRule();
            rule.validate(modelHelper,'null', 10).then(function(isValid){
                expect(isValid).to.be.true;
                done();
            }).catch(done);
        });

        it('should be invalid when number is > max value', function (done) {
            var rule = new MaxValueValidationRule();
            modelHelper.model.invalidNumber = 11;
            rule.validate(modelHelper,'invalidNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when string number is > max length', function (done) {
            var rule = new MaxValueValidationRule();
            modelHelper.model.invalidStringNumber = "11";
            rule.validate(modelHelper,'invalidStringNumber', 10).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });

        it('should be invalid when date is > max date', function (done) {
            var rule = new MaxValueValidationRule();
            var maximumDate = new Date(2000, 1, 1);
            modelHelper.model.invalidDate = new Date(2001, 1, 1);
            rule.validate(modelHelper,'invalidDate', maximumDate).then(function(isValid){
                expect(isValid).to.be.false;
                done();
            }).catch(done);
        });
    });
});