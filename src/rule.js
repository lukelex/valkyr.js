(function(){
  function Rule(config){
    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
  }

  Rule.prototype.$params = function(params){
    this.$$params = params;
    return this;
  };

  Rule.prototype.$check = function(fieldName, value){
    var result = { isOk: this.$$validator(value) };

    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
    }

    return result;
  };

  Rule.prototype.$getExtraInfo = function(form){
    return this;
  };

  window.valkyr.Rule = Rule;
})();
