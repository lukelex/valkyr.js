// ==========================================================================
// Project:   Valkyr.js - JavaScript Separation Of Concerns
// Copyright: Copyright 2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/lukelex/valkyr.js/blob/master/LICENSE
// ==========================================================================

// Version: 0.1.0 | From: 05-02-2014

window.valkyr = {
  customRules: {}
};

(function(){
  function Rule(config){
    this.$$name      = config.name;
    this.$$message   = config.message;
    this.$$validator = config.validator;
  }

  Rule.$retrieve = function(ruleName){
    var rule = window.valkyr.predefinedRules[ruleName]
                || window.valkyr.customRules[ruleName];

    if (!rule) { throw "Rule " + ruleName + " does not exist!" }

    return rule;
  };

  Rule.prototype.$check = function(fieldName, value){
    var result = { isOk: this.$$validator(value) };
    if (!result.isOk) {
      result.message = this.$$message.replace(/\%s/, fieldName);
    }

    return result;
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
        new window.valkyr.Constraint(
          selectField(form, constraints[i].name),
          constraints[i]
        )
      );
    }

    return newConstraints;
  }

  function selectField(form, fieldName){
    return form.querySelector(
      "input[name=\"" + fieldName + "\"]"
    );
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
    this.validate();
    return Object.keys(this.errors).length === 0;
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

  Validator.prototype.whenValid = function(){};
  Validator.prototype.whenInvalid = function(callback){
    callback(this.$$errors);
  };

  window.valkyr.Validator = Validator;
})();

(function(){
  function Constraint(field, config){
    this.$$field   = field;
    this.$$name    = config["name"];
    this.$$display = config["display"];

    this.$$rules   = buildRules(config["rules"]);
  }

  function buildRules(rulesDeclaration){
    var i, rulesNames, rules;

    rulesNames = rulesDeclaration.split("|");

    rules = [];

    i = rulesNames.length;
    while (i--) {
      rules.push(
        window.valkyr.Rule.$retrieve(rulesNames[i])
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
  var predefinedRules = {};

  predefinedRules["required"] = new window.valkyr.Rule({
    name: "required",
    message: "The %s field can't be empty.",
    validator: function(value){
      if (!value) { return false; }
      return value.length > 0;
    }
  });

  predefinedRules["email"] = new window.valkyr.Rule({
    name: "emailFormat",
    message: "The %s field must contain a valid email address.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(
        /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
      );
    }
  });

  predefinedRules["url"] = new window.valkyr.Rule({
    name: "url",
    message: "The %s field must contain a valid URL.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(
        /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
      );
    }
  });

  predefinedRules["integer"] = new window.valkyr.Rule({
    name: "integer",
    message: "The %s field must contain an integer.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(/^\-?[0-9]+$/);
    }
  });

  window.valkyr.predefinedRules = predefinedRules;
})();
