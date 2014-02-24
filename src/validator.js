window.valkyr.validator = function(form, spec) {
  if (!form) { throw "Missing form"; }
  if (!spec) { throw "Missing constraints"; }
  if (!(spec instanceof Array)) {
    throw "Constraints must be an array";
  }

  var constraints, originalSubmit;

  spec.errors = {};
  constraints = [];
  buildConstraints();
  setupSubmission();

  onError = function(){};

  function buildConstraints(){
    var i = spec.length;

    while (i--) {
      constraints.push(
        window.valkyr.constraint(form, spec[i])
      );
    }
  }

  function setupSubmission() {
    originalSubmit = form.onsubmit;

    form.onsubmit = function(event) {
      if (isValid()) {
        return (!!originalSubmit && originalSubmit(event));
      } else {
        preventSubmission(event);
      }
    };
  }

  function preventSubmission(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    } else if (window.event) {
      // IE uses the global event variable
      window.event.returnValue = false;
    }
  }

  function validate(field) {
    if (field) {
      validateField(field);
    } else {
      validateAllFields();
    }
  }
  spec.validate = validate;

  function validateField (field, constraint){
    var result;

    if (!constraint) {
      constraint = constraintFor(field);
    }

    result = constraint.validate();

    if (result.errors.length > 0) {
      spec.errors[result.name] = result.errors;
    } else {
      delete spec.errors[result.name];
    }
  }

  function validateAllFields(){
    var i, result;

    spec.errors = {};

    i = constraints.length;
    while (i--) {
      validateField(null, constraints[i]);
    }
  }

  function constraintFor(field){
    var i = constraints.length;
    while (i--) {
      if (constraints[i].field() == field) {
        return constraints[i];
      }
    }
  }

  function isValid(){
    var isValid = false;

    spec.validate();

    isValid = Object.keys(spec.errors).length === 0;

    if (!isValid) {
      onError(spec.errors);
    }

    return isValid;
  }
  spec.isValid = isValid;

  function submit(options) {
    if (!(options && options.skipValidations === true)) {
      if (!spec.isValid()) {
        return false;
      }
    }

    if (originalSubmit) {
      originalSubmit();
    }
  }
  spec.submit = submit;

  function onError(callback) {
    onError = callback;
    return spec;
  }

  return spec;
};
