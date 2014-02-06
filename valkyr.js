// ==========================================================================
// Project:   Valkyr.js - The ultimate JS library to validate your forms
// Copyright: Copyright 2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/lukelex/valkyr.js/blob/master/LICENSE
// ==========================================================================

// Version: 0.1.0 | From: 06-02-2014

window.valkyr = {
  customRules: {}
};

(function(){
  function BaseRule(config){
    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
  }

  BaseRule.$retrieve = function(ruleName){
    var rule = window.valkyr.predefinedRules.$find(ruleName)
            || window.valkyr.customRules[ruleName]

    if (!rule) { throw "Rule " + ruleName + " does not exist!" }

    return rule;
  };

  BaseRule.prototype.$params = function(params){
    this.$$params = params;
    return this;
  };

  window.valkyr.BaseRule = BaseRule;
})();

(function(){
  function ComparisonRule(config){
    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
  }

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
    this.$$comparedTo = form.querySelector(
      "input[name=\"" + this.$$params + "\"]"
    );
    return this;
  };

  window.valkyr.ComparisonRule = ComparisonRule;
})();

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

(function(){
  function Validator(form, constraints){
    if (!form)        { throw "Missing form"; }
    if (!constraints) { throw "Missing constraints"; }
    if (!(constraints instanceof Array)) {
      throw "Constraints must be an array";
    }

    this.$$form = form;
    this.$$constraints = buildConstraints(form, constraints);

    this.errors = {};

    this.$setupSubmission();
  }

  function buildConstraints(form, constraints){
    var newConstraints, i;

    newConstraints = [];

    i = constraints.length;
    while (i--) {
      newConstraints.push(
        new window.valkyr.Constraint(form, constraints[i])
      );
    }

    return newConstraints;
  }

  Validator.prototype.$setupSubmission = function(){
    this.$$originalSubmit = this.$$form.onsubmit;

    this.$$form.onsubmit = (function(that) {
      return function(event) {
        if (that.isValid()) {
          return (that.$$originalSubmit === undefined || that.$$originalSubmit(event));
        } else {
          preventSubmission(event)
        }
      };
    })(this);
  };

  function preventSubmission(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    } else if (window.event) {
      // IE uses the global event variable
      window.event.returnValue = false;
    };
  }

  Validator.prototype.validate = function(){
    var i, result;

    this.errors = {};

    i = this.$$constraints.length;

    while (i--) {
      result = this.$$constraints[i].$validate();
      if (result.errors.length > 0) {
        this.errors[result.name] = result.errors;
      }
    }
  };

  Validator.prototype.isValid = function(){
    var isValid = false;

    this.validate();

    isValid = Object.keys(this.errors).length === 0;

    if (!isValid && this.$$onError) {
      this.$$onError(this.errors);
    }

    return isValid;
  };

  Validator.prototype.submit = function(options){
    // if (options && options.skipValidations !== true) {
      if (!this.isValid()) {
        return false;
      }
    // }

    if (this.$$originalSubmit) {
      this.$$originalSubmit();
    }
  };

  Validator.prototype.onError = function(callback){
    this.$$onError = callback;
  };

  Validator.prototype.whenValid = function(){};
  Validator.prototype.whenInvalid = function(callback){
    callback(this.$$errors);
  };

  window.valkyr.Validator = Validator;
})();

(function(){
  function Constraint(form, config){
    this.$$name    = config["name"];
    this.$$display = config["display"];

    this.$$field   = selectField(form, this.$$name);

    this.$$rules   = buildRules(config["rules"], form);
  }

  function selectField(form, fieldName){
    return form.querySelector(
      "input[name=\"" + fieldName + "\"]"
    );
  }

  function buildRules(rulesDeclaration, form){
    var i, rulesNames, rules;

    rulesNames = rulesDeclaration.split("|");

    rules = [];

    i = rulesNames.length;
    while (i--) {
      rules.push(
        window.valkyr.BaseRule.$retrieve(
          rulesNames[i]
        ).$getExtraInfo(form)
      );
    }

    return rules;
  }

  Constraint.prototype.$validate = function(){
    var i, result;

    result = { name: this.$$name, errors: [] };

    i = this.$$rules.length;
    while (i--) {
      verification = this.$$rules[i].$check(
        this.$$name, this.$$field.value
      );

      if (!verification.isOk) {
        result.errors.push(verification.message);
      }
    }

    return result;
  };

  window.valkyr.Constraint = Constraint;
})();

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

(function(){
  var rules = {};

  var predefinedRules = {
    $find: function(ruleReference){
      var ruleConfig, rule;

      ruleConfig = parseRuleName(ruleReference);

      if (rule = rules[ruleConfig.name]) {
        rule.$params(ruleConfig.params);
      }

      return rule;
    }
  };

  function parseRuleName(ruleConfig){
    var params = ruleConfig.match(/\[(.+?)\]$/);
    if (params) { params = params[1]; }

    return {
      name: ruleConfig.match(/^.+?(?=\[.+?\])/) || ruleConfig,
      params: params
    };
  }

  rules["equals"] = new window.valkyr.ComparisonRule({
    name: "equals",
    message: "The %s field needs to be equal to %s field.",
    validator: function(value, comparedTo){
      return value === comparedTo;
    }
  });

  rules["numeric"] = new window.valkyr.Rule({
    name: "number",
    message: "The %s field must be a number.",
    validator: function(value){
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
  });

  rules["required"] = new window.valkyr.Rule({
    name: "required",
    message: "The %s field can't be empty.",
    validator: function(value){
      if (!value) { return false; }
      return value.length > 0;
    }
  });

  rules["email"] = new window.valkyr.Rule({
    name: "emailFormat",
    message: "The %s field must contain a valid email address.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(
        /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
      );
    }
  });

  rules["url"] = new window.valkyr.Rule({
    name: "url",
    message: "The %s field must contain a valid URL.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(
        /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
      );
    }
  });

  rules["integer"] = new window.valkyr.Rule({
    name: "integer",
    message: "The %s field must contain an integer.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(/^\-?[0-9]+$/);
    }
  });

  rules["decimal"] = new window.valkyr.Rule({
    name: "decimal",
    message: "The %s field must contain a decimal number.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(/^\-?[0-9]*\.[0-9]+$/);
    }
  });

  rules["natural"] = new window.valkyr.Rule({
    name: "natural",
    message: "The %s field must contain only positive numbers.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(/^[0-9]+$/i);
    }
  });

  rules["alphabetical"] = new window.valkyr.Rule({
    name: "alphabetical",
    message: "The %s field must only contain alphabetical characters.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(/^[a-z]+$/i);
    }
  });

  window.valkyr.predefinedRules = predefinedRules;
})();
