(function(){
  function Rule(config){
    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
    this.$$beforeValidations   = config.beforeValidations;
  }

  Rule.$retrieve = function(ruleName){
    var rule = window.valkyr.predefinedRules[ruleName]
                || window.valkyr.customRules[ruleName];

    if (!rule) { throw "Rule " + ruleName + " does not exist!" }

    return rule;
  };

  Rule.prototype.$check = function(fieldName, value){

    var result;

    if (this.$$beforeValidations) {
      result = { isOk: beforeValidate(this.$$beforeValidations, value) && this.$$validator(value) };
    } else{
      result = { isOk: this.$$validator(value) };
    }

    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
    }

    return result;
  };

  function beforeValidate(befores, value) {
    var isValid = true;

    for(var i = 0; i < befores.length; i++) {
      isValid = befores[i](value);

      if(isValid === false) break;
    }

    return isValid;
  };

  window.valkyr.Rule = Rule;
})();
