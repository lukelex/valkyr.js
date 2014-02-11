(function(){
  function ParameterRule(config){
    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
  }

  ParameterRule.prototype.$params = function(params){
    this.$$params = params;
    return this;
  };

  ParameterRule.prototype.$check = function(fieldName, value){
    var result = { isOk: this.$$validator(value, this.$$params) };
    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
    }

    return result;
  };

  ParameterRule.prototype.$getExtraInfo = function(_){
    return this;
  };

  window.valkyr.ParameterRule = ParameterRule;
})();