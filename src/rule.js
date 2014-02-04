(function(){
  function Rule(config){
    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
  }

  Rule.$retrieve = function(ruleName){
    var rule = window.valkyr.predefinedRules[ruleName]
           || window.valkyr.customRules[ruleName];

    if (!rule) { throw "Rule " + ruleName + " does not exist!" }

    return rule;
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
