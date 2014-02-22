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

  function buildInheritanceRule(inherits){
    if (inherits) {
      return retrieve(inherits);
    } else {
      return { check: function(){ return { isOk: true }; } };
    }
  }
})();
