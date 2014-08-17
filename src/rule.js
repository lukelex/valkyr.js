(function(){
  function Rule( spec ){
    spec.inheritanceRule = buildInheritanceRule( spec.inherits );

    spec.setParams = function setParams( _ ){ return spec; };
    spec.getExtraInfo = function getExtraInfo( _ ){ return spec; };

    spec.check = function check( fieldName, value ){
      var result = {
        isOk: checkWithHierarchy( fieldName, value )
      };

      if ( !result.isOk ) {
        result.message = errorMessageFor( fieldName );
      }

      return result;
    };

    function buildInheritanceRule( inherits ){
      if ( inherits ) {
        return retrieve( inherits );
      } else {
        return { check: function(){ return { isOk: true }; } };
      }
    }

    function checkWithHierarchy( fieldName, value ){
      return spec.inheritanceRule.check(
        fieldName, value
      ).isOk && spec.validator( value );
    }

    function errorMessageFor( fieldName ){
      var langMessage = spec.message;

      if ( valkyr.translations ) {
        langMessage = valkyr.translations[ spec.name ];
      }

      return langMessage.replace( /\%s/, fieldName );
    }

    return spec;
  }

  function build( spec ){
    var newRule = new Rule( spec );
    valkyr.customRules[ spec.name ] = newRule;
    return newRule;
  };

  function retrieve( ruleName ){
    var rule = valkyr.findRule( ruleName );

    if ( !rule ) { throw "Rule " + ruleName + " does not exist!"; }

    return rule;
  }

  valkyr.Rule = Rule;
  Rule.build = build;
  Rule.retrieve = retrieve;
})( window.valkyr );
