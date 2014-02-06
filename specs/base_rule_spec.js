describe("BaseRule", function(){
  describe(".$retrieve", function(){
    it("should return a predefined rule", function(){
      var rule = valkyr.BaseRule.$retrieve("required");

      expect(rule.constructor.name).toEqual("Rule");
    });
  });
});
