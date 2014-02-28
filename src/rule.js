(function(){
  function rule(spec){
    spec.inheritanceRule = buildInheritanceRule(spec.inherits)

    function setParams(_){ return spec; }
    spec.setParams = setParams;

    function getExtraInfo(_){ return spec; }
    spec.getExtraInfo = getExtraInfo;

    function check(fieldName, value){
      var result = {
        isOk: checkWithHierarchy(fieldName, value)
      };

      if (!result.isOk) {
        result.message = spec.message.replace(/\%s/, fieldName);
      }

      return result;
    } spec.check = check;

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
  }
  window.valkyr.rule = rule;

  function build(spec){
    var newRule = rule(spec);
    window.valkyr.customRules[spec.name] = newRule;
    return newRule;
  } rule.build = build;

  function retrieve(ruleName){
    var rule = window.valkyr.predefinedRules.$find(ruleName)
            || window.valkyr.customRules[ruleName];

    if (!rule) { throw "Rule " + ruleName + " does not exist!"; }

    return rule;
  } rule.retrieve = retrieve;
})();
