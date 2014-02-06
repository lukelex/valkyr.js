describe("Rule", function(){
  describe("#$check", function(){
    it("when not ok", function(){
      var rule = valkyr.BaseRule.$retrieve("required");

      expect(
        rule.$check("username", undefined)
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });

    it("when ok", function(){
      var rule = valkyr.BaseRule.$retrieve("required");

      expect(
        rule.$check("username", "some user name")
      ).toEqual({
        isOk: true
      });
    });
  });

  describe("simple inheritance", function(){
    it("should have the same error when inheritance fails", function(){
      var negativeNumberRule = new window.valkyr.Rule({
        name: "negative",
        message: "The %s field must be a negative number.",
        inherits: "numeric",
        validator: function (value) {
          return value < 0;
        }
      });

      expect(
        negativeNumberRule.$check("value", "abc")
      ).toEqual({
        isOk: false,
        message: "The value field must be a negative number.",
      });
    });

    it("should display its own error message when the inheritance rule passes", function(){
      var negativeNumberRule = new window.valkyr.Rule({
        name: "negative",
        message: "The %s field must be a negative number.",
        inherits: "numeric",
        validator: function (value) {
          return value < 0;
        }
      });

      expect(
        negativeNumberRule.$check("value", 123)
      ).toEqual({
        isOk: false,
        message: "The value field must be a negative number."
      });
    });
  });

  it("inheritance should handle the undefined case", function(){
    valkyr.Rule.build({
      name: "undefinedTest",
      message: "The %s field can't be undefined.",
      validator: function(value){
        if (value === undefined) { return false; }
      }
    });

    var rule = valkyr.Rule.build({
      name: "substr",
      inherits: "undefinedTest",
      message: "The %s blablabla.",
      validator: function(value){
        if (value.toUpperCase()) { return true; }
      }
    });

    expect(function(){
      rule.$check("something", undefined);
    }).not.toThrow();

    expect(
      rule.$check("something", undefined)
    ).toEqual({
      isOk: false,
      message: "The something blablabla."
    });
  });
});
