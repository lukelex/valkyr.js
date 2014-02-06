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
});
