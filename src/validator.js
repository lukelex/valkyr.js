(function(){
  function Validator(form, constraints){
    if (!form)        { throw "Missing form"; }
    if (!constraints) { throw "Missing constraints"; }
    if (!(constraints instanceof Array)) {
      throw "Constraints must be an array";
    }

    this.$$form = form;
    this.$$constraints = buildConstraints(form, constraints);

    this.errors = {};

    this.$setupSubmission();
  }

  function buildConstraints(form, constraints){
    var newConstraints, i;

    newConstraints = [];

    i = constraints.length;
    while (i--) {
      newConstraints.push(
        new window.valkyr.Constraint(form, constraints[i])
      );
    }

    return newConstraints;
  }

  Validator.method("$setupSubmission", function(){
    this.$$originalSubmit = this.$$form.onsubmit;

    this.$$form.onsubmit = (function(that) {
      return function(event) {
        if (that.isValid()) {
          return (!!that.$$originalSubmit && that.$$originalSubmit(event));
        } else {
          preventSubmission(event);
        }
      };
    })(this);
  });

  function preventSubmission(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    } else if (window.event) {
      // IE uses the global event variable
      window.event.returnValue = false;
    }
  }

  Validator.method("validate", function(field){
    if (field) {
      this.$validateField(field);
    } else {
      this.$validateAllFields();
    }
  });

  Validator.method("$validateField", function(field, constraint){
    var result;

    if (!constraint) {
      constraint = this.$constraintFor(field);
    }

    result = constraint.$validate();

    if (result.errors.length > 0) {
      this.errors[result.name] = result.errors;
    } else {
      delete this.errors[result.name];
    }
  });

  Validator.method("$validateAllFields", function(){
    var i, result;

    this.errors = {};

    i = this.$$constraints.length;

    while (i--) {
      this.$validateField(null, this.$$constraints[i]);
    }
  });

  Validator.method("$constraintFor", function(field){
    var i = this.$$constraints.length;
    while (i--) {
      if (this.$$constraints[i].$$field == field) {
        return this.$$constraints[i];
      }
    }
  });

  Validator.method("isValid", function(){
    var isValid = false;

    this.validate();

    isValid = Object.keys(this.errors).length === 0;

    if (!isValid && this.$$onError) {
      this.$$onError(this.errors);
    }

    return isValid;
  });

  Validator.method("submit", function(options){
    if (!(options && options.skipValidations === true)) {
      if (!this.isValid()) {
        return false;
      }
    }

    if (this.$$originalSubmit) {
      this.$$originalSubmit();
    }
  });

  Validator.method("onError", function(callback){
    this.$$onError = callback;
    return this;
  });

  window.valkyr.Validator = Validator;
})();
