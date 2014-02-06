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

    describe("credit cards", function() {

      describe("VISA", function() {


        it("with a non-valid VISA number", function() {
          var visaRule = new window.valkyr.CustomRule({
            name: "VISA",
            message: "The %s field does not have a valid VISA credit-card number.",
            inherits: "credit-card",
            validator: function(number) {
              return !!number.match(/^4/);
            }
          });

          expect(
            visaRule.$check("CC", "5555555555554444")
          ).toEqual({
            isOk: false,
            message: "The CC field does not have a valid VISA credit-card number."
          });
        });

        it("with a valid VISA number", function() {
          var visaRule = new window.valkyr.CustomRule({
            name: "VISA",
            message: "The %s field does not have a valid VISA credit-card number.",
            inherits: "credit-card",
            validator: function(number) {
              return !!number.match(/^4/);
            }
          });

          expect(
            visaRule.$check("CC", "4111111111111111")
          ).toEqual({
            isOk: true
          });
        });

      });
    });
  });

});
