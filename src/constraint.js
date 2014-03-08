window.valkyr.constraint = function( form, spec ){
  var rules, field;

  checkForDuplicateRules();

  rules = [];
  buildRules();
  field = form[ spec.name ];

  spec.field = function(){ return field; };

  spec.validate = function validate(){
    var result = { name: spec.name, errors: [] },
        i = rules.length,
        verification;

    while ( i-- ) {
      verification = rules[ i ].check(
        spec.as || spec.name, value()
      );

      if ( !verification.isOk ) {
        result.errors.push( verification.message );
      }
    }

    return result;
  };

  function value(){
    if ( isCheckbox() ) {
      return field.checked;
    } else if ( isRadio() ) {
      var i = field.length;
      while( i-- ) {
        if ( field[ i ].checked ) {
          return field[ i ].value;
        }
      }
    }

    return field.value;
  }

  function checkForDuplicateRules(){
    var names = rulesNames(),
        i = names.length,
        valuesSoFar = {};

    while ( i-- ) {
      var value = names[ i ];
      if ( Object.prototype.hasOwnProperty.call( valuesSoFar, value ) ) {
        throw "Duplicate rule declaration!";
      }
      valuesSoFar[ value ] = true;
    }
  }

  function buildRules(){
    var names = rulesNames(),
        i = names.length;

    while ( i-- ) {
      rules.push(
        window.valkyr.rule.retrieve(
          names[ i ]
        ).getExtraInfo( form )
      );
    }
  }

  function rulesNames(){
    return spec.rules.split( "|" );
  }

  function isCheckbox(){
    return field.nodeName === "INPUT" && field.type === "checkbox";
  }

  function isRadio(){
    if ( field instanceof window.NodeList ) {
      return field[ 0 ].nodeName === "INPUT" && field[ 0 ].type === "radio";
    }
    return false;
  }

  return spec;
};
