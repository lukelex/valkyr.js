describe("Rule", function(){
  describe(".$build", function(){
    it("should return a predefined rule", function(){
      var rule = valkyr.Rule.$build("presence");

      expect(rule.constructor.name).toEqual("Rule");
    });

    it("should build a custom rule", function(){
      var rule = valkyr.Rule.$build("myCustomRule", {
        name: "myCustomRule",
        message: "myCustomRule is rocking your form",
        validator: function(value){}
      });

      expect(rule.constructor.name).toEqual("CustomRule");
    });
  });

  describe("#$check", function(){
    it("when not ok", function(){
      var rule = valkyr.Rule.$build("presence");

      expect(
        rule.$check("username", undefined)
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });

    it("when ok", function(){
      var rule = valkyr.Rule.$build("presence");

      expect(
        rule.$check("username", "some user name")
      ).toEqual({
        isOk: true
      });
    });
  });
});
