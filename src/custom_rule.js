(function(){
  function CustomRule(config){
    if (!config) { throw "Rule configuration can't be empty"; }

    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
    this.$$inherits = config.inherits;
  }

  CustomRule.prototype.$check = function(value){
    var result;

    if (this.$$inherits) {
      result = { isOk: this.$$inherits(value) && this.$$validator(value) };
    } else{
      result = { isOk: this.$$validator(value) };
    }

    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
    }

    return result;
  };

  window.valkyr.CustomRule = CustomRule;
})();
