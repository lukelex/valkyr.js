describe("CustomRule", function(){
  describe("simple inheritance", function(){

    it("should inherite a predefined rule", function() {
      var negativeNumberRule = new window.valkyr.Rule({
                        name: "negative",
                        message: "The %s field must be a negative number.",
                        inherits: "numeric",
                        validator: function (value) {
                          return value < 0;
                        }
                      });

      expect(
        negativeNumberRule.$check("value", -1)
      ).toEqual({
        isOk: true
      });
    });
  });

});
