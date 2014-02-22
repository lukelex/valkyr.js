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
