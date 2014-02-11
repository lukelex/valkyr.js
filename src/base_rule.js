(function(){
  function BaseRule(config){
    this.$$name            = config.name;
    this.$$message         = config.message;
    this.$$validator       = config.validator;
    this.$$inheritanceRule = buildInheritanceRule(config.inherits);
  }

  BaseRule.$retrieve = function(ruleName){
    var rule = window.valkyr.predefinedRules.$find(ruleName)
            || window.valkyr.customRules[ruleName];

    if (!rule) { throw "Rule " + ruleName + " does not exist!"; }

    return rule;
  };

  BaseRule.prototype.$params = function(params){
    this.$$params = params;
    return this;
  };

  BaseRule.prototype.$getExtraInfo = function(_){
    return this;
  };

  function buildInheritanceRule(inherits){
    if (inherits) {
      return window.valkyr.BaseRule.$retrieve(inherits);
    } else {
      return { $check: function(){ return {isOk: true}; } };
    }
  }

  window.valkyr.BaseRule = BaseRule;
})();
