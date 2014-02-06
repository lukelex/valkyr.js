describe("CustomRule", function(){
  describe("simple inheritance", function(){

    it("should have inheritance errors", function(){
      var negativeNumberRule = new window.valkyr.CustomRule({
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
        message: "The value field must be a number."
      });
    });

    it("should display its own error message when the inheritance rule passes", function(){
      var negativeNumberRule = new window.valkyr.CustomRule({
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

});
