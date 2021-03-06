"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var RequiredValidationRule = /** @class */ (function () {
    function RequiredValidationRule() {
        this.ruleName = "required";
    }
    RequiredValidationRule.prototype.validate = function (modelResolver, propertyName, isRequired) {
        if (isRequired === void 0) { isRequired = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var value, testValue;
            return tslib_1.__generator(this, function (_a) {
                value = modelResolver.resolve(propertyName);
                if (value === undefined || value === null) {
                    return [2 /*return*/, !isRequired];
                }
                testValue = value;
                if (typeof (testValue) === 'string') {
                    if (String.prototype.trim) {
                        testValue = value.trim();
                    }
                    else {
                        testValue = value.replace(/^\s+|\s+$/g, '');
                    }
                }
                if (!isRequired) {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, (testValue + '').length > 0];
            });
        });
    };
    return RequiredValidationRule;
}());
exports.RequiredValidationRule = RequiredValidationRule;
