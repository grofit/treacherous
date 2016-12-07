"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rule_resolver_1 = require("../rulesets/rule-resolver");
var validation_group_1 = require("./validation-group");
var ReactiveValidationGroup = (function (_super) {
    __extends(ReactiveValidationGroup, _super);
    function ReactiveValidationGroup(fieldErrorProcessor, ruleResolver, modelResolverFactory, modelWatcherFactory, model, ruleset, refreshRate) {
        var _this = this;
        if (ruleResolver === void 0) { ruleResolver = new rule_resolver_1.RuleResolver(); }
        if (refreshRate === void 0) { refreshRate = 500; }
        _super.call(this, fieldErrorProcessor, ruleResolver, modelResolverFactory, model, ruleset);
        this.modelWatcherFactory = modelWatcherFactory;
        this.refreshRate = refreshRate;
        this.onModelChanged = function (eventArgs) {
            _this.startValidateProperty(eventArgs.propertyPath);
        };
        this.release = function () {
            if (_this.modelWatcher)
                _this.modelWatcher.stopWatching();
        };
        this.modelWatcher = this.modelWatcherFactory.createModelWatcher();
        this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
        this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
    }
    return ReactiveValidationGroup;
}(validation_group_1.ValidationGroup));
exports.ReactiveValidationGroup = ReactiveValidationGroup;
