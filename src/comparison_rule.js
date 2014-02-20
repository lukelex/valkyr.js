(function(){
  function ComparisonRule(config){
    window.valkyr.Rule.call(this, config);
  }

  ComparisonRule.inherits(window.valkyr.Rule);

  ComparisonRule.method("$params", function(params){
    this.$$params = params;
    return this;
  });

  ComparisonRule.method("$check", function(fieldName, value){
    var result = { isOk: this.$$validator(value, this.$$comparedTo.value) };
    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
      result.message = result.message.replace(/\%s/, this.$$params);
    }

    return result;
  });

  ComparisonRule.method("$getExtraInfo", function(form){
    this.$$comparedTo = form[this.$$params];
    return this;
  });

  window.valkyr.ComparisonRule = ComparisonRule;
})();
