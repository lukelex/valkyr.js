(function( valkyr, Rule, ParameterRule ){
  var rule;

  rule = new ParameterRule({
    name: "minLength",
    message: "The %s field must be at least %s characters in length.",
    validator: function( value, length ){
      return value.length >= length;
    }
  });
  valkyr.storeRule( "minLength", rule, "predefinedRules" );

  rule = new ParameterRule({
    name: "maxLength",
    message: "The %s field must not exceed %s characters in length.",
    validator: function( value, length ){
      return value.length <= length;
    }
  });
  valkyr.storeRule( "maxLength", rule, "predefinedRules" );

  rule = new ParameterRule({
    name: "exactLength",
    message: "The %s field must be exactly %s characters in length.",
    validator: function( value, length ){
      return value.length === length;
    }
  });
  valkyr.storeRule( "exactLength", rule, "predefinedRules" );

  rule = new Rule({
    name: "required",
    message: "The %s field can't be empty.",
    validator: function( value ){
      if ( !value || value === false ) { return false; }
      if ( value === true ) { return true; }
      return value.length > 0;
    }
  });
  valkyr.storeRule( "required", rule, "predefinedRules" );

  rule = new Rule({
    name: "emailFormat",
    inherits: "required",
    message: "The %s field must contain a valid email address.",
    validator: function( value ){
      return !!value.match(
        /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
      );
    }
  });
  valkyr.storeRule( "email", rule, "predefinedRules" );

  rule = new Rule({
    name: "url",
    inherits: "required",
    message: "The %s field must contain a valid URL.",
    validator: function( value ){
      return !!value.match(
        /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
      );
    }
  });
  valkyr.storeRule( "url", rule, "predefinedRules" );

  rule = new Rule({
    name: "number",
    message: "The %s field must be a number.",
    validator: function( value ){
      return !isNaN( parseFloat( value ) ) && isFinite( value );
    }
  });
  valkyr.storeRule( "numeric", rule, "predefinedRules" );

  rule = new Rule({
    name: "integer",
    inherits: "numeric",
    message: "The %s field must contain an integer.",
    validator: function( value ){
      return !!value.match( /^\-?[0-9]+$/ );
    }
  });
  valkyr.storeRule( "integer", rule, "predefinedRules" );

  rule = new Rule({
    name: "decimal",
    inherits: "numeric",
    message: "The %s field must contain a decimal number.",
    validator: function( value ){
      return !!value.match( /^\-?[0-9]*\.[0-9]+$/ );
    }
  });
  valkyr.storeRule( "decimal", rule, "predefinedRules" );

  rule = new Rule({
    name: "natural",
    inherits: "numeric",
    message: "The %s field must contain only positive numbers.",
    validator: function( value ){
      return !!value.match( /^[0-9]+$/i );
    }
  });
  valkyr.storeRule( "natural", rule, "predefinedRules" );

  rule = new Rule({
    name: "alphabetical",
    inherits: "required",
    message: "The %s field must only contain alphabetical characters.",
    validator: function( value ){
      return !!value.match( /^[a-z]+$/i );
    }
  });
  valkyr.storeRule( "alphabetical", rule, "predefinedRules" );

  rule = new valkyr.ComparisonRule({
    name: "equals",
    inherits: "required",
    message: "The %s field needs to be equal to %s field.",
    validator: function( value, comparedTo ){
      return value === comparedTo;
    }
  });
  valkyr.storeRule( "equals", rule, "predefinedRules" );

  rule = new Rule({
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
  valkyr.storeRule( "credit-card", rule, "predefinedRules" );

  rule = new Rule({
    name: "IP",
    inherits: "required",
    message: "The %s field must contain a valid IP.",
    validator: function( ip ){
      return !!ip.match( /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i );
    }
  });
  valkyr.storeRule( "ip", rule, "predefinedRules" );
})( window.valkyr, window.valkyr.Rule, window.valkyr.ParameterRule );
