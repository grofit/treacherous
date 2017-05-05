import { Ruleset } from "../rulesets/ruleset";
import { RuleLink } from "../rulesets/rule-link";
import { ForEachRule } from "../rulesets/for-each-rule";
import { TypeHelper } from "../helpers/type-helper";
export class RulesetBuilder {
    constructor(ruleRegistry) {
        this.ruleRegistry = ruleRegistry;
        this.verifyExistingProperty = () => {
            if (!this.currentProperty) {
                throw new Error("A property must precede any rule calls in the chain");
            }
        };
        this.verifyRuleNameIsValid = (rule) => {
            if (rule == null || typeof (rule) == "undefined" || rule.length == 0) {
                throw new Error("A rule name is required");
            }
            if (this.ruleRegistry && !this.ruleRegistry.hasRuleNamed(rule)) {
                throw new Error(`The rule [${rule}] has not been registered`);
            }
        };
        this.create = () => {
            this.internalRuleset = new Ruleset();
            this.currentProperty = null;
            return this;
        };
        this.forProperty = (propertyNameOrPredicate) => {
            var endProperty = propertyNameOrPredicate;
            if (TypeHelper.isFunctionType(endProperty)) {
                endProperty = this.extractPropertyName(propertyNameOrPredicate);
                if (!endProperty) {
                    throw new Error(`cannot resolve property from: ${propertyNameOrPredicate}`);
                }
            }
            this.currentProperty = endProperty;
            this.currentRule = null;
            return this;
        };
        this.addRule = (rule, ruleOptions) => {
            this.verifyRuleNameIsValid(rule);
            this.verifyExistingProperty();
            this.internalRuleset.addRule(this.currentProperty, this.currentRule = new RuleLink(rule, ruleOptions));
            return this;
        };
        this.withMessage = (messageOverride) => {
            this.verifyExistingProperty();
            this.currentRule.messageOverride = messageOverride;
            return this;
        };
        this.appliesIf = (appliesFunction) => {
            this.verifyExistingProperty();
            this.currentRule.appliesIf = appliesFunction;
            return this;
        };
        this.addRuleForEach = (rule, ruleOptions) => {
            this.verifyRuleNameIsValid(rule);
            this.verifyExistingProperty();
            var ruleLink = new RuleLink(rule, ruleOptions);
            this.currentRule = ruleLink;
            this.internalRuleset.addRule(this.currentProperty, new ForEachRule(ruleLink));
            return this;
        };
        this.addRuleset = (ruleset) => {
            this.verifyExistingProperty();
            this.internalRuleset.addRuleset(this.currentProperty, ruleset);
            return this;
        };
        this.addRulesetForEach = (ruleset) => {
            this.verifyExistingProperty();
            this.internalRuleset.addRuleset(this.currentProperty, new ForEachRule(ruleset));
            return this;
        };
        this.build = () => {
            return this.internalRuleset;
        };
    }
    extractPropertyName(predicate) {
        var regex = /.*\.([\w]*);/;
        var predicateString = predicate.toString();
        return regex.exec(predicateString)[1];
    }
}
