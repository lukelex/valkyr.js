(function(){
  function CustomRule(config){
    if (!config) { throw "Rule configuration can't be empty"; }

    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
    this.$$inheritanceRule  = window.valkyr.BaseRule.$retrieve(config.inherits);
  }

  CustomRule.prototype.$check = function(fieldName, value){
    var result, inheritanceResult;

    if (this.$$inheritanceRule) {
      inheritanceResult = this.$$inheritanceRule.$check(
        fieldName, value
      );
      result = {
        isOk: inheritanceResult.isOk && this.$$validator(value)
      };
    } else{
      result = { isOk: this.$$validator(value) };
    }

    if (!result.isOk) {

      if(!inheritanceResult.isOk)
        result.message = inheritanceResult.message;
      else
        result.message = this.$$message.replace(/\%s/, fieldName);
    }

    return result;
  };

  window.valkyr.CustomRule = CustomRule;
})();
