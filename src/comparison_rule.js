(function(){
  function ComparisonRule(config){
    window.valkyr.Rule.call(this, config);
  }

  ComparisonRule.prototype = Object.create(window.valkyr.Rule.prototype);
  ComparisonRule.prototype.constructor = ComparisonRule;

  ComparisonRule.prototype.$params = function(params){
    this.$$params = params;
    return this;
  };

  ComparisonRule.prototype.$check = function(fieldName, value){
    var result = { isOk: this.$$validator(value, this.$$comparedTo.value) };
    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
      result.message = result.message.replace(/\%s/, this.$$params);
    }

    return result;
  };

  ComparisonRule.prototype.$getExtraInfo = function(form){
    this.$$comparedTo = form[this.$$params];
    return this;
  };

  window.valkyr.ComparisonRule = ComparisonRule;
})();
