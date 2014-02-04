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
        window.valkyr.Rule.$build(rulesNames[i])
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
