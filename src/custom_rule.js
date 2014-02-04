(function(){
  function CustomRule(config){
    if (!config) { throw "Rule configuration can't be empty"; }

    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
  }

  CustomRule.prototype.$check = function(value){
    var result = { isOk: this.$$validator(value) };
    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
    }

    return result;
  };

  window.valkyr.CustomRule = CustomRule;
})();
