import {Ruleset} from "../rulesets/ruleset";
import {RuleLink} from "../rulesets/rule-link";
import {ForEachRule} from "../rulesets/for-each-rule";
import {RuleRegistry} from "../rules/rule-registry";
import {TypeHelper} from "../helpers/type-helper";
import {IModelResolver} from "../resolvers/imodel-resolver";

export class RulesetBuilder<T>
{
    protected internalRuleset: Ruleset;
    protected currentProperty: string;
    protected currentRule:RuleLink;

    constructor(private ruleRegistry?: RuleRegistry) {}

    protected extractPropertyName(predicate: (model: T) => any) : string {
        var regex = /.*\.([\w]*);/;
        var predicateString = predicate.toString();
        return regex.exec(predicateString)[1];
    }

    protected verifyExistingProperty = () => {
        if(!this.currentProperty)
        { throw new Error("A property must precede any rule calls in the chain"); }
    }

    protected verifyRuleNameIsValid = (rule) => {
        if(rule == null || typeof(rule) == "undefined" || rule.length == 0)
        { throw new Error("A rule name is required"); }

        if(this.ruleRegistry && !this.ruleRegistry.hasRuleNamed(rule))
        { throw new Error(`The rule [${rule}] has not been registered`); }
    }

    public create = (): RulesetBuilder<T> =>
    {
        this.internalRuleset = new Ruleset();
        this.currentProperty = null;
        return this;
    }

    public forProperty = (propertyNameOrPredicate: ((model: T) => any) | string): RulesetBuilder<T> =>
    {
        var endProperty = propertyNameOrPredicate;
        if(TypeHelper.isFunctionType(endProperty))
        {
            endProperty = this.extractPropertyName(<any>propertyNameOrPredicate);
            if(!endProperty) { throw new Error(`cannot resolve property from: ${propertyNameOrPredicate}`); }
        }

        this.currentProperty = <string>endProperty;
        this.currentRule = null;
        return this;
    }

    public addRule = (rule: string, ruleOptions?: any): RulesetBuilder<T> =>
    {
        this.verifyRuleNameIsValid(rule);
        this.verifyExistingProperty();
        this.internalRuleset.addRule(this.currentProperty, this.currentRule=new RuleLink(rule, ruleOptions));
        return this;
    }

    public withMessage = (messageOverride: ((value: any, ruleOptions?: any) => string) | string): RulesetBuilder<T> =>
    {
        this.verifyExistingProperty();
        this.currentRule.messageOverride = messageOverride;
        return this;
    }

    public appliesIf = (appliesFunction: ((modelResolver: IModelResolver, value: any, ruleOptions?: any) => boolean) | boolean): RulesetBuilder<T> =>
    {
        this.verifyExistingProperty();
        this.currentRule.appliesIf = appliesFunction;
        return this;
    }

    public addRuleForEach = (rule: string, ruleOptions?: any): RulesetBuilder<T> =>
    {
        this.verifyRuleNameIsValid(rule);
        this.verifyExistingProperty();

        var ruleLink = new RuleLink(rule, ruleOptions);
        this.currentRule = ruleLink;
        this.internalRuleset.addRule(this.currentProperty, new ForEachRule<RuleLink>(ruleLink));

        return this;
    }

    public addRuleset = (ruleset: Ruleset): RulesetBuilder<T> =>
    {
        this.verifyExistingProperty();

        this.internalRuleset.addRuleset(this.currentProperty, ruleset);
        return this;
    }

    public addRulesetForEach = (ruleset: Ruleset): RulesetBuilder<T> =>
    {
        this.verifyExistingProperty();

        this.internalRuleset.addRuleset(this.currentProperty, new ForEachRule<Ruleset>(ruleset));
        return this;
    }

    public build = (): Ruleset =>
    {
        return this.internalRuleset;
    }
}