describe("Rule", function(){
  describe(".$retrieve", function(){
    it("should return a predefined rule", function(){
      var rule = valkyr.Rule.$retrieve("required");

      expect(rule.constructor.name).toEqual("Rule");
    });
  });

  describe("#$check", function(){
    it("when not ok", function(){
      var rule = valkyr.Rule.$retrieve("required");

      expect(
        rule.$check("username", undefined)
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });

    it("when ok", function(){
      var rule = valkyr.Rule.$retrieve("required");

      expect(
        rule.$check("username", "some user name")
      ).toEqual({
        isOk: true
      });
    });
  });
});
