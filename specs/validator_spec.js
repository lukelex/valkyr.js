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
          rules: "presence"
        }, {
          name: "password",
          rules: "presence"
        }]
      );

      expect(loginForm.$$constraints.length).toEqual(2);
    });
  });

  describe("validate", function(){
    it("when ok", function(){
      var form, loginForm;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/><input name=\"password\"></input>";

      loginForm = new valkyr.Validator(form, [{
          name: "username",
          rules: "presence"
        }, {
          name: "password",
          rules: "presence"
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
});
