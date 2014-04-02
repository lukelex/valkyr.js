(function(){
  var rule;

  rule = window.valkyr.parameterRule({
    name: "minLength",
    message: "The %s field must be at least %s characters in length.",
    validator: function( value, length ){
      return value.length >= length;
    }
  });
  window.valkyr.storeRule( "minLength", rule, "predefinedRules" );

  rule = window.valkyr.parameterRule({
    name: "maxLength",
    message: "The %s field must not exceed %s characters in length.",
    validator: function( value, length ){
      return value.length <= length;
    }
  });
  window.valkyr.storeRule( "maxLength", rule, "predefinedRules" );

  rule = window.valkyr.parameterRule({
    name: "exactLength",
    message: "The %s field must be exactly %s characters in length.",
    validator: function( value, length ){
      return value.length === length;
    }
  });
  window.valkyr.storeRule( "exactLength", rule, "predefinedRules" );

  rule = window.valkyr.rule({
    name: "required",
    message: "The %s field can't be empty.",
    validator: function( value ){
      if ( !value || value === false ) { return false; }
      if ( value === true ) { return true; }
      return value.length > 0;
    }
  });
  window.valkyr.storeRule( "required", rule, "predefinedRules" );

  rule = window.valkyr.rule({
    name: "emailFormat",
    inherits: "required",
    message: "The %s field must contain a valid email address.",
    validator: function( value ){
      return !!value.match(
        /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
      );
    }
  });
  window.valkyr.storeRule( "email", rule, "predefinedRules" );

  rule = window.valkyr.rule({
    name: "url",
    inherits: "required",
    message: "The %s field must contain a valid URL.",
    validator: function( value ){
      return !!value.match(
        /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
      );
    }
  });
  window.valkyr.storeRule( "url", rule, "predefinedRules" );

  rule = window.valkyr.rule({
    name: "number",
    message: "The %s field must be a number.",
    validator: function( value ){
      return !isNaN( parseFloat( value ) ) && isFinite( value );
    }
  });
  window.valkyr.storeRule( "numeric", rule, "predefinedRules" );

  rule = window.valkyr.rule({
    name: "integer",
    inherits: "numeric",
    message: "The %s field must contain an integer.",
    validator: function( value ){
      return !!value.match( /^\-?[0-9]+$/ );
    }
  });
  window.valkyr.storeRule( "integer", rule, "predefinedRules" );

  rule = window.valkyr.rule({
    name: "decimal",
    inherits: "numeric",
    message: "The %s field must contain a decimal number.",
    validator: function( value ){
      return !!value.match( /^\-?[0-9]*\.[0-9]+$/ );
    }
  });
  window.valkyr.storeRule( "decimal", rule, "predefinedRules" );

  rule = window.valkyr.rule({
    name: "natural",
    inherits: "numeric",
    message: "The %s field must contain only positive numbers.",
    validator: function( value ){
      return !!value.match( /^[0-9]+$/i );
    }
  });
  window.valkyr.storeRule( "natural", rule, "predefinedRules" );

  rule = window.valkyr.rule({
    name: "alphabetical",
    inherits: "required",
    message: "The %s field must only contain alphabetical characters.",
    validator: function( value ){
      return !!value.match( /^[a-z]+$/i );
    }
  });
  window.valkyr.storeRule( "alphabetical", rule, "predefinedRules" );

  rule = window.valkyr.comparisonRule({
    name: "equals",
    inherits: "required",
    message: "The %s field needs to be equal to %s field.",
    validator: function( value, comparedTo ){
      return value === comparedTo;
    }
  });
  window.valkyr.storeRule( "equals", rule, "predefinedRules" );

  rule = window.valkyr.rule({
    name: "creditCardNumber",
    inherits: "required",
    message: "The %s field doesn't have a valid credit-card number.",
    validator: function( number ){
      var len, mul, prodArr, sum;

      len = number.length;
      mul = 0;
      prodArr = [ [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ], [ 0, 2, 4, 6, 8, 1, 3, 5, 7, 9 ] ];
      sum = 0;

      while ( len-- ) {
        sum += prodArr[ mul ][ parseInt( number.charAt( len ), 10 ) ];
        mul ^= 1;
      }

      return sum % 10 === 0 && sum > 0;
    }
  });
  window.valkyr.storeRule( "credit-card", rule, "predefinedRules" );

  rule = window.valkyr.rule({
    name: "IP",
    inherits: "required",
    message: "The %s field must contain a valid IP.",
    validator: function( ip ){
      return !!ip.match( /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i );
    }
  });
  window.valkyr.storeRule( "ip", rule, "predefinedRules" );
})();
