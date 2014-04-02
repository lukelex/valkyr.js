describe("Rule", function(){
  describe(".retrieve", function(){
    it("should return a predefined rule", function(){
      var rule = valkyr.rule.retrieve("required");

      expect(rule.constructor.name).toEqual("Object");
    });
  });

  describe("#check", function(){
    it("when not ok", function(){
      var rule = valkyr.rule.retrieve("required");

      expect(
        rule.check("username", undefined)
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });

    it("when ok", function(){
      var rule = valkyr.rule.retrieve("required");

      expect(
        rule.check("username", "some user name")
      ).toEqual({
        isOk: true
      });
    });
  });

  describe("simple inheritance", function(){
    it("should have the same error when inheritance fails", function(){
      var negativeNumberRule = valkyr.rule.build({
        name: "negative",
        message: "The %s field must be a negative number.",
        inherits: "numeric",
        validator: function (value) {
          return value < 0;
        }
      });

      expect(
        negativeNumberRule.check("value", "abc")
      ).toEqual({
        isOk: false,
        message: "The value field must be a negative number.",
      });
    });

    it("should display its own error message when the inheritance rule passes", function(){
      var negativeNumberRule = valkyr.rule.build({
        name: "negative",
        message: "The %s field must be a negative number.",
        inherits: "numeric",
        validator: function (value) {
          return value < 0;
        }
      });

      expect(
        negativeNumberRule.check("value", 123)
      ).toEqual({
        isOk: false,
        message: "The value field must be a negative number."
      });
    });

    describe("credit cards", function() {
      describe("VISA", function() {
        it("with a non-valid VISA number", function() {
          var visaRule = valkyr.rule.build({
            name: "VISA",
            message: "The %s field does not have a valid VISA credit-card number.",
            inherits: "credit-card",
            validator: function(number) {
              return !!number.match(/^4/);
            }
          });

          expect(
            visaRule.check("CC", "5555555555554444")
          ).toEqual({
            isOk: false,
            message: "The CC field does not have a valid VISA credit-card number."
          });
        });

        it("with a valid VISA number", function() {
          var visaRule = valkyr.rule.build({
            name: "VISA",
            message: "The %s field does not have a valid VISA credit-card number.",
            inherits: "credit-card",
            validator: function(number) {
              return !!number.match(/^4/);
            }
          });

          expect(
            visaRule.check("CC", "4111111111111111")
          ).toEqual({
            isOk: true
          });
        });
      });
    });
  });

  it("inheritance should handle the undefined case", function(){
    valkyr.rule.build({
      name: "undefinedTest",
      message: "The %s field can't be undefined.",
      validator: function(value){
        if (value === undefined) { return false; }
      }
    });

    var rule = valkyr.rule.build({
      name: "substr",
      inherits: "undefinedTest",
      message: "The %s blablabla.",
      validator: function(value){
        if (value.toUpperCase()) { return true; }
      }
    });

    expect(function(){
      rule.check("something", undefined);
    }).not.toThrow();

    expect(
      rule.check("something", undefined)
    ).toEqual({
      isOk: false,
      message: "The something blablabla."
    });
  });

  describe("translations", function(){
    beforeEach(function(){
      valkyr.translations = undefined;
    });
    afterEach(function(){
      valkyr.translations = undefined;
    });

    it("should use the new translated message", function(){
      valkyr.translations = { required: "%s felt kan ikke være udefineret." };

      var requiredRule = valkyr.findRule("required")

      expect(
        requiredRule.check("Navn", "")
      ).toEqual({
        isOk: false,
        message: "Navn felt kan ikke være udefineret.",
      });
    });
  });
});
