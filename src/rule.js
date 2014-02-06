(function(){
  function Rule(config){
    this.$$name            = config.name;
    this.$$message         = config.message;
    this.$$validator       = config.validator;
    this.$$inheritanceRule = buildInheritanceRule(config.inherits);
  }

  Rule.build = function(config){
    return window.valkyr.customRules[config.name] = new Rule(config);
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

  Rule.prototype.$getExtraInfo = function(form){
    return this;
  };

  function buildInheritanceRule(inherits){
    if (inherits) {
      return window.valkyr.BaseRule.$retrieve(inherits);
    } else {
      return { $check: function(){ return {isOk: true}; } }
    }
  }

  window.valkyr.Rule = Rule;
})();
