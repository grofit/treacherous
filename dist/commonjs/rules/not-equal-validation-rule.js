"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var type_helper_1 = require("../helpers/type-helper");
var comparer_helper_1 = require("../helpers/comparer-helper");
var NotEqualValidationRule = /** @class */ (function () {
    function NotEqualValidationRule() {
        this.ruleName = "notEqual";
    }
    NotEqualValidationRule.prototype.validate = function (modelResolver, propertyName, optionsOrValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var value, comparison, weakEquality;
            return tslib_1.__generator(this, function (_a) {
                value = modelResolver.resolve(propertyName);
                if (type_helper_1.TypeHelper.isEmptyValue(value)) {
                    return [2 /*return*/, true];
                }
                comparison = optionsOrValue.value || optionsOrValue;
                weakEquality = optionsOrValue.weakEquality || false;
                if (type_helper_1.TypeHelper.isFunctionType(comparison)) {
                    comparison = comparison();
                }
                if (type_helper_1.TypeHelper.isDateType(comparison)) {
                    return [2 /*return*/, !comparer_helper_1.ComparerHelper.dateTimeCompararer(value, comparison)];
                }
                else {
                    return [2 /*return*/, !comparer_helper_1.ComparerHelper.simpleTypeComparer(value, comparison, weakEquality)];
                }
                return [2 /*return*/];
            });
        });
    };
    return NotEqualValidationRule;
}());
exports.NotEqualValidationRule = NotEqualValidationRule;
