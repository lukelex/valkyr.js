(function(){
  var customRules = {},
      predefinedRules = {};

  function findRule( ruleReference ){
    var ruleConfig = parseRuleName( ruleReference ),
        rule = customRules[ ruleConfig.name ]
            || predefinedRules[ ruleConfig.name ];

    if ( rule ) { rule.setParams( ruleConfig.params ); }

    return rule;
  }

  function storeRule( ruleName, rule, collectionName ){
    var collection = eval(collectionName);
    collection[ ruleName ] = rule;
  }

  function parseRuleName( ruleConfig ){
    var params = ruleConfig.match( /\[(.+?)\]$/ );
    if ( params ) { params = params[ 1 ]; }

    return {
      name: ruleConfig.match( /^.+?(?=\[.+?\])/ ) || ruleConfig,
      params: params
    };
  }

  window.valkyr = {
    findRule: findRule,
    storeRule: storeRule,
    customRules: customRules,
    parseRuleName: parseRuleName
  };
})();
