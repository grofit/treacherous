"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rule_resolver_1 = require("../rulesets/rule-resolver");
var validation_group_1 = require("./validation-group");
var ReactiveValidationGroup = /** @class */ (function (_super) {
    tslib_1.__extends(ReactiveValidationGroup, _super);
    function ReactiveValidationGroup(fieldErrorProcessor, ruleResolver, modelResolverFactory, modelWatcherFactory, localeHandler, model, ruleset, refreshRate) {
        if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
        if (refreshRate === void 0) { refreshRate = 500; }
        var _this = _super.call(this, fieldErrorProcessor, ruleResolver, modelResolverFactory, localeHandler, model, ruleset) || this;
        _this.modelWatcherFactory = modelWatcherFactory;
        _this.localeHandler = localeHandler;
        _this.refreshRate = refreshRate;
        _this.onModelChanged = function (eventArgs) {
            _this.startValidateProperty(eventArgs.propertyPath);
        };
        _this.release = function () {
            if (_this.modelWatcher)
                _this.modelWatcher.stopWatching();
        };
        _this.modelWatcher = _this.modelWatcherFactory.createModelWatcher();
        _this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
        _this.modelWatcher.onPropertyChanged.subscribe(_this.onModelChanged);
        return _this;
    }
    return ReactiveValidationGroup;
}(validation_group_1.ValidationGroup));
exports.ReactiveValidationGroup = ReactiveValidationGroup;
