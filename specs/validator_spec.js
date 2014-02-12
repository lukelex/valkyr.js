describe("Validator", function(){
  describe("#initialize", function(){
    it("should throw if no form is passed", function(){
      expect(function(){
        new valkyr.Validator();
      }).toThrow("Missing form");
    });

    it("should throw if no constraints are passed", function(){
      expect(function(){
        new valkyr.Validator("form");
      }).toThrow("Missing constraints");
    });

    it("should throw if constraints is not an array", function(){
      expect(function(){
        new valkyr.Validator("form", {});
      }).toThrow("Constraints must be an array");
    });

    it("should build up the constraints", function(){
      var form, loginForm;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/><input name=\"password\"></input>";

      loginForm = new valkyr.Validator(form, [{
          name: "username",
          rules: "required"
        }, {
          name: "password",
          rules: "required"
        }]
      );

      expect(loginForm.$$constraints.length).toEqual(2);
    });

    it("with an absent rule", function(){
      var form;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/><input name=\"password\"></input>";

      expect(function(){
        new valkyr.Validator(form, [{
          name: "username",
          rules: "fakeRules"
        }]);
      }).toThrow("Rule fakeRules does not exist!");
    });
  });

  describe("validate", function(){
    it("when ok", function(){
      var form, loginForm;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/><input name=\"password\"></input>";

      loginForm = new valkyr.Validator(form, [{
          name: "username",
          rules: "required"
        }, {
          name: "password",
          rules: "required"
        }]
      );

      loginForm.submit();

      expect(
        loginForm.errors
      ).toEqual({
        username: ["The username field can't be empty."],
        password: ["The password field can't be empty."]
      });
    });
  });

  describe("#isValid", function(){
    it("when valid", function(){
      var form, loginForm;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/><input name=\"password\"></input>";

      loginForm = new valkyr.Validator(form, []);

      spyOn(loginForm, "validate");

      expect(loginForm.isValid()).toBeTruthy();
    });

    it("when valid", function(){
      var form, loginForm;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/><input name=\"password\"></input>";

      loginForm = new valkyr.Validator(form, []);

      spyOn(loginForm, "validate").andCallFake(function(){
        this.errors = { username: ["some error"] };
      });

      expect(loginForm.isValid()).toBeFalsy();
    });
  });

  describe("#$setupSubmission", function(){
    it("should trigger a previous submission when valid", function(){
      var form, previousSubmission, loginForm;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/><input name=\"password\"></input>";

      previousSubmission = jasmine.createSpy("previousSubmission");

      form.onsubmit = previousSubmission;

      loginForm = new valkyr.Validator(form, []);
      loginForm.submit();

      expect(previousSubmission).toHaveBeenCalled();
    });

    it("should not fail when no onsubmit is predefined", function(){
      var form, loginForm;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/><input name=\"password\"></input>";

      loginForm = new valkyr.Validator(form, []);

      expect(function(){
        loginForm.submit();
      }).not.toThrow();
    });
  });

  describe("#submit", function(){
    it("should skip validations", function(){
      var login = new window.valkyr.Validator("<form>", []);

      spyOn(login, "isValid");

      login.submit({skipValidations: true});

      expect(login.isValid).not.toHaveBeenCalled();
    });
  });
});
