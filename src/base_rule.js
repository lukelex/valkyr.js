(function(){
  function BaseRule(config){
    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
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

  window.valkyr.BaseRule = BaseRule;
})();
