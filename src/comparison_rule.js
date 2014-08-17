(function( valkyr, Rule ){
  function ComparisonRule( spec ){
    var obj = new Rule( spec );

    obj.setParams = function setParams( newParams ){
      obj.params = newParams;
      return obj;
    };

    obj.check = function check( fieldName, value ){
      var result = {
        isOk: obj.validator( value, obj.comparedTo.value )
      };
      if ( !result.isOk ) {
        result.message = obj.message.replace( /\%s/, fieldName );
        result.message = result.message.replace( /\%s/, obj.params );
      }

      return result;
    };

    obj.getExtraInfo = function getExtraInfo( form ){
      obj.comparedTo = form[ obj.params ];
      return obj;
    };

    return obj;
  }

  function buildComparison( spec ){
    var newRule = new ComparisonRule( spec );
    valkyr.customRules[ spec.name ] = newRule;
    return newRule;
  };

  valkyr.ComparisonRule = ComparisonRule;
  valkyr.buildComparison = buildComparison;
})( window.valkyr, window.valkyr.Rule );
