(function(){
  function Rule(config){
    window.valkyr.BaseRule.call(this, config);
    this.$$inheritanceRule = buildInheritanceRule(config.inherits);
  }

  Rule.build = function(config){
    var newRule = new Rule(config);
    window.valkyr.customRules[config.name] = newRule;
    return newRule;
  };

  Rule.prototype.$params = function(params){
    this.$$params = params;
    return this;
  };

  Rule.prototype.$check = function(fieldName, value){
    var result = {
      isOk: this.$checkWithHierarchy(fieldName, value)
    };

    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
    }

    return result;
  };

  Rule.prototype.$checkWithHierarchy = function(fieldName, value){
    return this.$$inheritanceRule.$check(
      fieldName, value
    ).isOk && this.$$validator(value);
  };

  Rule.prototype.$getExtraInfo = function(_){
    return this;
  };

  function buildInheritanceRule(inherits){
    if (inherits) {
      return window.valkyr.BaseRule.$retrieve(inherits);
    } else {
      return { $check: function(){ return {isOk: true}; } };
    }
  }

  window.valkyr.Rule = Rule;
})();
