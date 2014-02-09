describe("Constraints", function(){
  describe("#initialize", function(){
    it("should not allow duplicate rules", function(){
      expect(function(){
        new valkyr.Constraint("", {
          name: "username",
          rules: "required|required"
        }).toThow("Duplicate rule declaration!");
      });
    });

    it("should build one rule", function(){
      var form, constraint;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/>";

      constraint = new valkyr.Constraint(form, {
        name: "username",
        rules: "required"
      });

      expect(constraint.$$rules.length).toEqual(1);
    });

    it("should build two rules", function(){
      var form, constraint;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/>";

      constraint = new valkyr.Constraint(form, {
        name: "username",
        rules: "required|numeric"
      });

      expect(constraint.$$rules.length).toEqual(2);
    });

    it("should build three rules", function(){
      var form, constraint;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/>";

      constraint = new valkyr.Constraint(form, {
        name: "username",
        rules: "required|numeric|equals[username]"
      });

      expect(constraint.$$rules.length).toEqual(3);
    });
  });

  it("should use the display name instead", function(){
    var form, constraint;

    form = document.createElement("form");
    form.innerHTML = "<input name=\"first_name\"/>";

    constraint = new valkyr.Constraint(form, {
      as: "First Name",
      name: "first_name",
      rules: "required"
    });

    expect(
      constraint.$validate()
    ).toEqual({
      name: "first_name",
      errors: ["The First Name field can't be empty."]
    });
  });

  describe("checkbox", function(){
    it("should fail if it's required and not checked", function(){
      var form, singup;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"terms\" type=\"checkbox\"/>";

      singup = new valkyr.Constraint(form, {
        name: "terms",
        rules: "required"
      });

      expect(singup.$validate()).toEqual({
        name: "terms",
        errors: ["The terms field can't be empty."]
      });
    });

    it("should pass if required and is checked", function(){
      var form, singup;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"terms\" type=\"checkbox\" checked=\"checked\"/>";

      singup = new valkyr.Constraint(form, {
        name: "terms",
        rules: "required"
      });

      expect(singup.$validate()).toEqual({
        name: "terms",
        errors: []
      });
    });
  });

  describe("radio", function(){
    it("should fail if it's required and not checked", function(){
      var form, singup;

      form = document.createElement("form");
      form.innerHTML = "" +
      "<input name=\"age_range\" type=\"radio\" value=\"0~12\"/>" +
      "<input name=\"age_range\" type=\"radio\" value=\"13~18\"/>";

      singup = new valkyr.Constraint(form, {
        name: "age_range",
        rules: "required"
      });

      expect(singup.$validate()).toEqual({
        name: "age_range",
        errors: ["The age_range field can't be empty."]
      });
    });

    it("should pass if required and is checked", function(){
      var form, singup;

      form = document.createElement("form");
      form.innerHTML = "" +
      "<input name=\"age_range\" type=\"radio\" value=\"0~12\" checked=\"checked\"/>" +
      "<input name=\"age_range\" type=\"radio\" value=\"13~18\"/>";

      singup = new valkyr.Constraint(form, {
        name: "age_range",
        rules: "required"
      });

      expect(singup.$validate()).toEqual({
        name: "age_range",
        errors: []
      });
    });
  });

  describe("select", function(){
    it("should fail if it's required and default is selected", function(){
      var form, singup;

      form = document.createElement("form");
      form.innerHTML = "<select name=\"gender\">" +
      "<option value=\"\">Select your gender</option>" +
      "<option value=\"male\">Male</option>" +
      "<option value=\"female\">Female</option>" +
      "</select>";

      singup = new valkyr.Constraint(form, {
        name: "gender",
        rules: "required"
      });

      expect(singup.$validate()).toEqual({
        name: "gender",
        errors: ["The gender field can't be empty."]
      });
    });

    it("should pass if required and a non-empty option is selected", function(){
      var form, singup;

      form = document.createElement("form");
      form.innerHTML = "<select name=\"gender\">" +
      "<option value=\"\">Select your gender</option>" +
      "<option value=\"male\">Male</option>" +
      "<option value=\"female\" selected=\"selected\">Female</option>" +
      "</select>";

      singup = new valkyr.Constraint(form, {
        name: "gender",
        rules: "required"
      });

      expect(singup.$validate()).toEqual({
        name: "gender",
        errors: []
      });
    });
  });
});
