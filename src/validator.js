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

    this.$$setupSubmission();
  }

  function buildConstraints(form, constraints){
    var newConstraints, i;

    newConstraints = [];

    i = constraints.length;
    while (i--) {
      newConstraints.push(
        new window.valkyr.Constraint(
          selectField(form, constraints[i].name),
          constraints[i]
        )
      );
    }

    return newConstraints;
  }

  function selectField(form, fieldName){
    return form.querySelector(
      "input[name=\"" + fieldName + "\"]"
    );
  }

  Validator.prototype.$$setupSubmission = function(){
    this.$$originalSubmit = this.$$form.onsubmit;
    this.$$form.addEventListener("submit", function(){
      if (this.$$validate()) {
        this.$$originalSubmit();
      }
    });
  };

  Validator.prototype.validate = function(){
    var i, result;

    i = this.$$constraints.length;

    while (i--) {
      result = this.$$constraints[i].$validate();
      this.errors[result.name] = result.errors;
    }

    return true;
  };

  Validator.prototype.isValid = function(){
    this.validate();
    return Object.keys(this.errors).length === 0;
  };

  Validator.prototype.submit = function(options){
    // if (options && options.skipValidations !== true) {
      if (!this.isValid()) {
        return false;
      }
    // }

    if (this.$$originalSubmit) {
      this.$$originalSubmit();
    }
  };

  Validator.prototype.whenValid = function(){};
  Validator.prototype.whenInvalid = function(callback){
    callback(this.$$errors);
  };

  window.valkyr.Validator = Validator;
})();
