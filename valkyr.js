// ==========================================================================
// Project:   Valkyr.js - The power of judgment over your forms!
// Copyright: Copyright 2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/lukelex/valkyr.js/blob/master/LICENSE
// ==========================================================================

// Version: 0.2.1 | From: 22-02-2014

window.valkyr = {
  customRules: {}
};

(function(){
  Function.prototype.method = function(name, func){
    if (!this.hasOwnProperty(name)) {
      this.prototype[name] = func;
      return this;
    }
  };
})();

(function(){
  window.valkyr.rule = function(spec){
    spec.inheritanceRule = buildInheritanceRule(spec.inherits)

    spec.setParams = function(_){
      return spec;
    };

    spec.getExtraInfo = function(_){
      return spec;
    };

    spec.check = function(fieldName, value){
      var result = {
        isOk: checkWithHierarchy(fieldName, value)
      };

      if (!result.isOk) {
        result.message = spec.message.replace(/\%s/, fieldName);
      }

      return result;
    };

    function buildInheritanceRule(inherits){
      if (inherits) {
        return retrieve(inherits);
      } else {
        return { check: function(){ return { isOk: true }; } };
      }
    }

    function checkWithHierarchy(fieldName, value){
      return spec.inheritanceRule.check(
        fieldName, value
      ).isOk && spec.validator(value);
    };

    return spec;
  };

  window.valkyr.rule.build = function(spec){
    var newRule = window.valkyr.rule(spec);
    window.valkyr.customRules[spec.name] = newRule;
    return newRule;
  };

  function retrieve(ruleName){
    var rule = window.valkyr.predefinedRules.$find(ruleName)
            || window.valkyr.customRules[ruleName];

    if (!rule) { throw "Rule " + ruleName + " does not exist!"; }

    return rule;
  }

  window.valkyr.rule.retrieve = retrieve;
})();

window.valkyr.comparisonRule = function(spec){
  var obj = window.valkyr.rule(spec);

  obj.setParams = function(newParams){
    obj.params = newParams;
    return obj;
  };

  obj.check = function(fieldName, value){
    var result = {
      isOk: obj.validator(value, obj.comparedTo.value)
    };
    if (!result.isOk) {
      result.message = obj.message.replace(/\%s/, fieldName);
      result.message = result.message.replace(/\%s/, obj.params);
    }

    return result;
  };

  obj.getExtraInfo = function(form){
    obj.comparedTo = form[obj.params];
    return obj;
  };

  return obj;
};

window.valkyr.parameterRule = function(spec){
  var obj = window.valkyr.rule(spec);

  obj.setParams = function(newParams){
    obj.params = newParams;
    return obj;
  };

  obj.check = function(fieldName, value){
    var result = {
      isOk: obj.validator(value, obj.params)
    };
    if (!result.isOk) {
      result.message = obj.message.replace(/\%s/, fieldName);
      result.message = result.message.replace(/\%s/, obj.params);
    }

    return result;
  };

  return obj;
};

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
        window.valkyr.constraint(form, constraints[i])
      );
    }

    return newConstraints;
  }

  Validator.method("$setupSubmission", function(){
    this.$$originalSubmit = this.$$form.onsubmit;

    this.$$form.onsubmit = (function(that) {
      return function(event) {
        if (that.isValid()) {
          return (!!that.$$originalSubmit && that.$$originalSubmit(event));
        } else {
          preventSubmission(event);
        }
      };
    })(this);
  });

  function preventSubmission(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    } else if (window.event) {
      // IE uses the global event variable
      window.event.returnValue = false;
    }
  }

  Validator.method("validate", function(field){
    if (field) {
      this.$validateField(field);
    } else {
      this.$validateAllFields();
    }
  });

  Validator.method("$validateField", function(field, constraint){
    var result;

    if (!constraint) {
      constraint = this.$constraintFor(field);
    }

    result = constraint.validate();

    if (result.errors.length > 0) {
      this.errors[result.name] = result.errors;
    } else {
      delete this.errors[result.name];
    }
  });

  Validator.method("$validateAllFields", function(){
    var i, result;

    this.errors = {};

    i = this.$$constraints.length;
    while (i--) {
      this.$validateField(null, this.$$constraints[i]);
    }
  });

  Validator.method("$constraintFor", function(field){
    var i = this.$$constraints.length;
    while (i--) {
      if (this.$$constraints[i].field() == field) {
        return this.$$constraints[i];
      }
    }
  });

  Validator.method("isValid", function(){
    var isValid = false;

    this.validate();

    isValid = Object.keys(this.errors).length === 0;

    if (!isValid && this.$$onError) {
      this.$$onError(this.errors);
    }

    return isValid;
  });

  Validator.method("submit", function(options){
    if (!(options && options.skipValidations === true)) {
      if (!this.isValid()) {
        return false;
      }
    }

    if (this.$$originalSubmit) {
      this.$$originalSubmit();
    }
  });

  Validator.method("onError", function(callback){
    this.$$onError = callback;
    return this;
  });

  window.valkyr.Validator = Validator;
})();

window.valkyr.constraint = function(form, spec){
  var rulesSeparator, field, rules;

  rulesSeparator = "|";

  checkForDuplicateRules(spec["rules"].split(rulesSeparator));

  rules = [];

  field = selectField(form, spec.name);

  buildRules(spec["rules"], form);

  spec.field = function(){ return field; };

  spec.validate = function(){
    var i, result, verification;

    result = { name: spec.name, errors: [] };

    i = rules.length;
    while (i--) {
      verification = rules[i].check(
        spec.as || spec.name, value()
      );

      if (!verification.isOk) {
        result.errors.push(verification.message);
      }
    }

    return result;
  };

  function value(){
    if (isCheckbox()) {
      return field.checked;
    } else if (isRadio()) {
      var i = field.length;
      while(i--) {
        if (field[i].checked) {
          return field[i].value;
        }
      }
    }

    return field.value;
  }

  function checkForDuplicateRules(rules){
    var i, valuesSoFar = {};
    i = rules.length;
    while (i--) {
      var value = rules[i];
      if (Object.prototype.hasOwnProperty.call(valuesSoFar, value)) {
        throw "Duplicate rule declaration!";
      }
      valuesSoFar[value] = true;
    }
  }

  function selectField(form, fieldName){
    return form[fieldName];
  }

  function buildRules(rulesDeclaration, form){
    var i, rulesNames;

    rulesNames = rulesDeclaration.split(rulesSeparator);

    i = rulesNames.length;
    while (i--) {
      rules.push(
        window.valkyr.rule.retrieve(
          rulesNames[i]
        ).getExtraInfo(form)
      );
    }
  }

  function isCheckbox(){
    return field.nodeName === "INPUT" && field.type === "checkbox";
  }

  function isRadio(){
    if (field instanceof window.NodeList) {
      return field[0].nodeName === "INPUT" && field[0].type === "radio";
    }
    return false;
  }

  return spec;
};

(function(){
  var rules = {};

  var predefinedRules = {
    $find: function(ruleReference){
      var ruleConfig, rule;

      ruleConfig = parseRuleName(ruleReference);

      if (rule = rules[ruleConfig.name]) {
        rule.setParams(ruleConfig.params);
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

  window.valkyr.predefinedRules = predefinedRules;

  rules["minLength"] = window.valkyr.parameterRule({
    name: "minLength",
    message: "The %s field must be at least %s characters in length.",
    validator: function(value, length){
      return value.length >= length;
    }
  });

  rules["maxLength"] = window.valkyr.parameterRule({
    name: "maxLength",
    message: "The %s field must not exceed %s characters in length.",
    validator: function(value, length){
      return value.length <= length;
    }
  });

  rules["exactLength"] = window.valkyr.parameterRule({
    name: "exactLength",
    message: "The %s field must be exactly %s characters in length.",
    validator: function(value, length){
      return value.length === length;
    }
  });

  rules["required"] = window.valkyr.rule({
    name: "required",
    message: "The %s field can't be empty.",
    validator: function(value){
      if (!value || value === false) { return false; }
      if (value === true) { return true; }
      return value.length > 0;
    }
  });

  rules["email"] = window.valkyr.rule({
    name: "emailFormat",
    inherits: "required",
    message: "The %s field must contain a valid email address.",
    validator: function(value){
      return !!value.match(
        /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
      );
    }
  });

  rules["url"] = window.valkyr.rule({
    name: "url",
    inherits: "required",
    message: "The %s field must contain a valid URL.",
    validator: function(value){
      return !!value.match(
        /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
      );
    }
  });

  rules["numeric"] = window.valkyr.rule({
    name: "number",
    message: "The %s field must be a number.",
    validator: function(value){
      return !isNaN(parseFloat(value)) && isFinite(value);
    }
  });

  rules["integer"] = window.valkyr.rule({
    name: "integer",
    inherits: "numeric",
    message: "The %s field must contain an integer.",
    validator: function(value){
      return !!value.match(/^\-?[0-9]+$/);
    }
  });

  rules["decimal"] = window.valkyr.rule({
    name: "decimal",
    inherits: "numeric",
    message: "The %s field must contain a decimal number.",
    validator: function(value){
      return !!value.match(/^\-?[0-9]*\.[0-9]+$/);
    }
  });

  rules["natural"] = window.valkyr.rule({
    name: "natural",
    inherits: "numeric",
    message: "The %s field must contain only positive numbers.",
    validator: function(value){
      return !!value.match(/^[0-9]+$/i);
    }
  });

  rules["alphabetical"] = window.valkyr.rule({
    name: "alphabetical",
    inherits: "required",
    message: "The %s field must only contain alphabetical characters.",
    validator: function(value){
      return !!value.match(/^[a-z]+$/i);
    }
  });

  rules["equals"] = window.valkyr.comparisonRule({
    name: "equals",
    inherits: "required",
    message: "The %s field needs to be equal to %s field.",
    validator: function(value, comparedTo){
      return value === comparedTo;
    }
  });

  rules["credit-card"] = window.valkyr.rule({
    name: "creditCardNumber",
    inherits: "required",
    message: "The %s field doesn't have a valid credit-card number.",
    validator: function(number){
      var len, mul, prodArr, sum;

      len = number.length;
      mul = 0;
      prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]];
      sum = 0;

      while (len--) {
        sum += prodArr[mul][parseInt(number.charAt(len), 10)];
        mul ^= 1;
      }

      return sum % 10 === 0 && sum > 0;
    }
  });

  rules["ip"] = window.valkyr.rule({
    name: "IP",
    inherits: "required",
    message: "The %s field must contain a valid IP.",
    validator: function(ip){
      return !!ip.match(/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i);
    }
  });
})();

(function(){
  window.Validator = window.valkyr.Validator;
})();
