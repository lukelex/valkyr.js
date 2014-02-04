describe("predefinedRules", function(){
  describe("presence", function(){
    it("with a value", function(){
      var rule = valkyr.predefinedRules["presence"];

      expect(
        rule.$check("username", "with some value")
      ).toEqual({
        isOk: true
      });
    });

    it("with an empty value", function(){
      var rule = valkyr.predefinedRules["presence"];

      expect(
        rule.$check("username", "")
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });

    it("with an undefined value", function(){
      var rule = valkyr.predefinedRules["presence"];

      expect(
        rule.$check("username", undefined)
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });
  });
});
