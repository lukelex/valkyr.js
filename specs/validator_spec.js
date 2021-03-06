describe("validator", function(){
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

    it("with an absent rule", function(){
      var form = document.createElement("form");
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
    it("when not ok", function(){
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

      loginForm.validate();

      expect(
        loginForm.errors
      ).toEqual({
        username: ["The username field can't be empty."],
        password: ["The password field can't be empty."]
      });
    });

    it("should validate a single field", function(){
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

      loginForm.validate(form['username']);

      expect(
        loginForm.errors
      ).toEqual({
        username: ["The username field can't be empty."]
      });
    });

    it("should empty a single field", function(){
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

      loginForm.validate();
      form['username'].value = 'some-name';
      loginForm.validate(form['username']);

      expect(
        loginForm.errors
      ).toEqual({
        password : [ "The password field can't be empty." ]
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

    it("when not valid", function(){
      var form, loginForm;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/><input name=\"password\"></input>";

      loginForm = new valkyr.Validator(form, []);

      spyOn(loginForm, "validate").and.callFake(function(){
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
      var login = new valkyr.Validator("<form>", []);

      spyOn(login, "isValid");

      login.submit({skipValidations: true});

      expect(login.isValid).not.toHaveBeenCalled();
    });
  });

  describe("#onError", function(){
    it("should be called when form is invalid", function(){
      var login, onError;

      onError = jasmine.createSpy("onError");

      login = document.createElement("form");
      login.innerHTML = "<input name=\"username\"/>";

      loginForm = new valkyr.Validator(login, [{
          name: "username",
          rules: "required"
        }]
      ).onError(onError);

      loginForm.validate();

      expect(onError).toHaveBeenCalled();
    });
  });
});
