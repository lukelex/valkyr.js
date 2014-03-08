window.valkyr.comparisonRule = function( spec ){
  var obj = window.valkyr.rule( spec );

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
};
