describe("predefinedRules", function(){
  describe("numeric", function(){

    describe("integers", function(){
      it("with a negative number string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "-10")
        ).toEqual({
          isOk: true
        });
      });


      it("with zero string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "0")
        ).toEqual({
          isOk: true
        });
      });


      it("with positive number string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "5")
        ).toEqual({
          isOk: true
        });
      });


      it("with negative number", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", -40)
        ).toEqual({
          isOk: true
        });
      });


      it("with zero number", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", 0)
        ).toEqual({
          isOk: true
        });
      });


      it("with a positive number", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", 32)
        ).toEqual({
          isOk: true
        });
      });


      it("with an octal number string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "040")
        ).toEqual({
          isOk: true
        });
      });


      it("with an octal number", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", 0144)
        ).toEqual({
          isOk: true
        });
      });


      it("with an hexadecimal number string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "0xFF")
        ).toEqual({
          isOk: true
        });
      });


      it("with an hexadecimal number", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", 0xFFF)
        ).toEqual({
          isOk: true
        });
      });
    });

    describe("floating points", function (){
      it("with a negative floating point string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "-1.6")
        ).toEqual({
          isOk: true
        });
      });


      it("with a positive floating point string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "4.5")
        ).toEqual({
          isOk: true
        });
      });


      it("with a negative floating point number", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", -1.3)
        ).toEqual({
          isOk: true
        });
      });


      it("with a positive floating point number", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", 2112.333)
        ).toEqual({
          isOk: true
        });
      });


      it("with exponential number", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", 3e8)
        ).toEqual({
          isOk: true
        });
      });


      it("with exponential string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "3e8")
        ).toEqual({
          isOk: true
        });
      });
    });

    describe("non-numeric things", function(){
      it("empty string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("whitespace string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "      ")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("tab", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "\t\t\t")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("alphanumeric string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "abcd12345")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("non-numeric string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "thiago moreira rocha")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("boolean true", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", true)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("boolean false", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", false)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("number with trailling non-numeric characters string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "7.2abcd")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("with undefined", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", undefined)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("with null", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", null)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("empty string", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", "")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("with NaN", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", NaN)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("with infinity", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", Infinity)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("with positive infinity", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", Number.POSITIVE_INFINITY)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("with negative infinity", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", Number.NEGATIVE_INFINITY)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("with a date", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", new Date(2014,05,02))
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("with an object", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", new Object())
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });


      it("with a function", function() {
        var rule = valkyr.predefinedRules["numeric"];

        expect(
          rule.$check("age", function(){})
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });
    });
  });

  describe("required", function(){
    it("with a value", function(){
      var rule = valkyr.predefinedRules["required"];

      expect(
        rule.$check("username", "with some value")
      ).toEqual({
        isOk: true
      });
    });

    it("with an empty value", function(){
      var rule = valkyr.predefinedRules["required"];

      expect(
        rule.$check("username", "")
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });

    it("with an undefined value", function(){
      var rule = valkyr.predefinedRules["required"];

      expect(
        rule.$check("username", undefined)
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });
  });

  describe("email", function(){
    it("simple extension email", function(){
      var rule = valkyr.predefinedRules["email"];

      expect(
        rule.$check("email", "valkyr@nordic.eu")
      ).toEqual({
        isOk: true
      });
    });

    it("double extension email", function(){
      var rule = valkyr.predefinedRules["email"];

      expect(
        rule.$check("email", "valkyr@nordic.eu.org")
      ).toEqual({
        isOk: true
      });
    });

    it("no @ email", function(){
      var rule = valkyr.predefinedRules["email"];

      expect(
        rule.$check("email", "valkyr_nordic.eu.org")
      ).toEqual({
        isOk: false,
        message: "The email field must contain a valid email address."
      });
    });

    it("no extension email", function(){
      var rule = valkyr.predefinedRules["email"];

      expect(
        rule.$check("email", "valkyr@nordic")
      ).toEqual({
        isOk: false,
        message: "The email field must contain a valid email address."
      });
    });

    it("an empty email", function(){
      var rule = valkyr.predefinedRules["email"];

      expect(
        rule.$check("email", "")
      ).toEqual({
        isOk: false,
        message: "The email field must contain a valid email address."
      });
    });

    it("an undefined email", function(){
      var rule = valkyr.predefinedRules["email"];

      expect(
        rule.$check("email", undefined)
      ).toEqual({
        isOk: false,
        message: "The email field must contain a valid email address."
      });
    });
  });
});
