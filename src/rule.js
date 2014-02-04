(function(){
  function Rule(config){
    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
  }

  Rule.$build = function(ruleName, newRuleConfig){
    var existingRule = window.valkyr.predefinedRules[ruleName];

    if (existingRule) {
      return existingRule;
    } else {
      return new window.valkyr.CustomRule(newRuleConfig);
    }
  };

  Rule.prototype.$check = function(fieldName, value){
    var result = { isOk: this.$$validator(value) };
    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
    }

    return result;
  };

  window.valkyr.Rule = Rule;
})();
