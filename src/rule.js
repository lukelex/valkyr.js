(function(){
  function Rule(config){
    this.$$name            = config.name;
    this.$$message         = config.message;
    this.$$validator       = config.validator;
    this.$$inheritanceRule = buildInheritanceRule(config.inherits);
  }

  function buildInheritanceRule(inherits){
    if (inherits) {
      return Rule.$retrieve(inherits);
    } else {
      return { $check: function(){ return {isOk: true}; } };
    }
  }

  Rule.$retrieve = function(ruleName){
    var rule = window.valkyr.predefinedRules.$find(ruleName)
            || window.valkyr.customRules[ruleName];

    if (!rule) { throw "Rule " + ruleName + " does not exist!"; }

    return rule;
  };

  Rule.build = function(config){
    var newRule = new Rule(config);
    window.valkyr.customRules[config.name] = newRule;
    return newRule;
  };

  Rule.method("$params", function(_){
    return this;
  });

  Rule.method("$getExtraInfo", function(_){
    return this;
  });

  Rule.method("$check", function(fieldName, value){
    var result = {
      isOk: this.$checkWithHierarchy(fieldName, value)
    };

    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
    }

    return result;
  });

  Rule.method("$checkWithHierarchy", function(fieldName, value){
    return this.$$inheritanceRule.$check(
      fieldName, value
    ).isOk && this.$$validator(value);
  });

  window.valkyr.Rule = Rule;
})();
