(function(){
  function ParameterRule(config){
    window.valkyr.Rule.call(this, config);
  }

  ParameterRule.prototype = Object.create(window.valkyr.Rule.prototype);
  ParameterRule.prototype.constructor = ParameterRule;

  ParameterRule.prototype.$params = function(params){
    this.$$params = params;
    return this;
  };

  ParameterRule.prototype.$check = function(fieldName, value){
    var result = { isOk: this.$$validator(value, this.$$params) };
    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
      result.message = result.message.replace(/\%s/, this.$$params);
    }

    return result;
  };

  window.valkyr.ParameterRule = ParameterRule;
})();
