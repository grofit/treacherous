define(["require", "exports", "tslib"], function (require, exports, tslib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ISODateValidationRule = (function () {
        function ISODateValidationRule() {
            this.ruleName = "isoDate";
            this.isoDateRegex = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
        }
        ISODateValidationRule.prototype.validate = function (modelResolver, propertyName) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var value;
                return tslib_1.__generator(this, function (_a) {
                    value = modelResolver.resolve(propertyName);
                    if (value === undefined || value === null) {
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, this.isoDateRegex.test(value)];
                });
            });
        };
        ISODateValidationRule.prototype.getMessage = function (modelResolver, propertyName) {
            var value = modelResolver.resolve(propertyName);
            return "This field contains \"" + value + "\" which is not a valid ISO date";
        };
        return ISODateValidationRule;
    }());
    exports.ISODateValidationRule = ISODateValidationRule;
});
