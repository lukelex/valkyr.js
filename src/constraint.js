(function(){
  var rulesSeparator = "|";

  function Constraint(form, config){
    checkForDuplicateRules(config["rules"].split(rulesSeparator));

    this.$$as    = config["as"];
    this.$$name  = config["name"];

    this.$$field = selectField(form, this.$$name);

    this.$$rules = buildRules(config["rules"], form);
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
    var i, rulesNames, rules;

    rulesNames = rulesDeclaration.split(rulesSeparator);

    rules = [];

    i = rulesNames.length;
    while (i--) {
      rules.push(
        window.valkyr.Rule.$retrieve(
          rulesNames[i]
        ).$getExtraInfo(form)
      );
    }

    return rules;
  }

  Constraint.prototype.$validate = function(){
    var i, result, verification;

    result = { name: this.$$name, errors: [] };

    i = this.$$rules.length;
    while (i--) {
      verification = this.$$rules[i].$check(
        this.$$as || this.$$name, this.$value()
      );

      if (!verification.isOk) {
        result.errors.push(verification.message);
      }
    }

    return result;
  };

  Constraint.prototype.$value = function(){
    if (isCheckbox(this.$$field)) {
      return this.$$field.checked;
    } else if (isRadio(this.$$field)) {
      var i = this.$$field.length;
      while(i--) {
        if (this.$$field[i].checked) {
          return this.$$field[i].value;
        }
      }
    };

    return this.$$field.value;
  };

  function isCheckbox(elm){
    return elm.nodeName === "INPUT" && elm.type === "checkbox";
  }

  function isRadio(elm){
    if (elm instanceof NodeList) {
      return elm[0].nodeName === "INPUT" && elm[0].type === "radio";
    }
    return false;
  }

  window.valkyr.Constraint = Constraint;
})();
