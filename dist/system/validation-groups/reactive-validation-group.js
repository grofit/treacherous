System.register(["event-js", "../rulesets/rule-resolver", "./validation-group"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var event_js_1, rule_resolver_1, validation_group_1;
    var ReactiveValidationGroup;
    return {
        setters:[
            function (event_js_1_1) {
                event_js_1 = event_js_1_1;
            },
            function (rule_resolver_1_1) {
                rule_resolver_1 = rule_resolver_1_1;
            },
            function (validation_group_1_1) {
                validation_group_1 = validation_group_1_1;
            }],
        execute: function() {
            ReactiveValidationGroup = (function (_super) {
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
                    this.propertyStateChangedEvent = new event_js_1.EventHandler(this);
                    this.modelStateChangedEvent = new event_js_1.EventHandler(this);
                    this.modelWatcher = this.modelWatcherFactory.createModelWatcher();
                    this.modelWatcher.setupWatcher(model, ruleset, refreshRate);
                    this.modelWatcher.onPropertyChanged.subscribe(this.onModelChanged);
                }
                return ReactiveValidationGroup;
            }(validation_group_1.ValidationGroup));
            exports_1("ReactiveValidationGroup", ReactiveValidationGroup);
        }
    }
});
