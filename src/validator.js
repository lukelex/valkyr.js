(function( window, valkyr ){
  function Validator( form, spec ){
    if ( !form ) { throw "Missing form"; }
    if ( !spec ) { throw "Missing constraints"; }
    if ( !( spec instanceof Array ) ) { throw "Constraints must be an array"; }

    var constraints = [],
        originalSubmit,
        onErrorCallback = function(){};

    spec.errors = {};

    buildConstraints();
    setupSubmission();

    spec.validate = function validate( field ){
      var validationResult;

      if ( field ) {
        validationResult = validateField( field );
      } else {
        validationResult = validateAllFields();
      }

      if ( !validationResult ) {
        onErrorCallback( spec.errors );
      }
    };

    spec.submit = function submit( options ){
      if ( !( options && options.skipValidations === true ) ) {
        if ( !spec.isValid() ) {
          return false;
        }
      }

      if ( originalSubmit ) { originalSubmit(); }
    };

    spec.onError = function onError( callback ){
      onErrorCallback = callback;
      return spec;
    };

    function buildConstraints(){
      var i = spec.length;

      while ( i-- ) {
        constraints.push(
          new valkyr.Constraint( form, spec[ i ] )
        );
      }
    }

    function isValid(){
      spec.validate();
      return Object.keys( spec.errors ).length === 0;
    } spec.isValid = isValid;

    function setupSubmission(){
      originalSubmit = form.onsubmit;

      form.onsubmit = function(event) {
        if ( isValid() ) {
          !!originalSubmit && originalSubmit( event );
        } else {
          preventSubmission( event );
          onErrorCallback( spec.errors );
        }
      };
    }

    function preventSubmission( event ){
      if ( event && event.preventDefault ) {
        event.preventDefault();
      } else if ( window.event ) {
        // IE uses the global event variable
        window.event.returnValue = false;
      }
    }

    function validateField( field, constraint ){
      var result;

      if ( !constraint ) {
        constraint = constraintFor( field );
      }

      result = constraint.validate();

      if ( result.errors.length > 0 ) {
        spec.errors[ result.name ] = result.errors;
      } else {
        delete spec.errors[ result.name ];
      }
    }

    function validateAllFields(){
      var i = constraints.length;

      spec.errors = {};

      while ( i-- ) {
        validateField( null, constraints[ i ] );
      }
    }

    function constraintFor( field ){
      var i = constraints.length;
      while ( i-- ) {
        if ( constraints[ i ].field() === field ) {
          return constraints[ i ];
        }
      }
    }

    return spec;
  };

  valkyr.Validator = Validator;
})( window, window.valkyr );
