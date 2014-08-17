(function( valkyr, Rule ){
  function ParameterRule( spec ){
    var obj = new Rule( spec );

    obj.setParams = function setParams( newParams ){
      obj.params = newParams;
      return obj;
    };

    obj.check = function check( fieldName, value ){
      var result = {
        isOk: obj.validator( value, obj.params )
      };
      if ( !result.isOk ) {
        result.message = obj.message.replace( /\%s/, fieldName );
        result.message = result.message.replace( /\%s/, obj.params );
      }

      return result;
    };

    return obj;
  };

  valkyr.ParameterRule = ParameterRule;
})( window.valkyr, window.valkyr.Rule );
