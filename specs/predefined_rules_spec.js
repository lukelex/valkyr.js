describe("predefinedRules", function(){
  describe("numeric", function(){
    describe("integers", function(){
      it("with a negative number string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "-10")
        ).toEqual({
          isOk: true
        });
      });

      it("with zero string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "0")
        ).toEqual({
          isOk: true
        });
      });

      it("with positive number string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "5")
        ).toEqual({
          isOk: true
        });
      });

      it("with negative number", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", -40)
        ).toEqual({
          isOk: true
        });
      });

      it("with zero number", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", 0)
        ).toEqual({
          isOk: true
        });
      });

      it("with a positive number", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", 32)
        ).toEqual({
          isOk: true
        });
      });

      it("with an octal number string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "040")
        ).toEqual({
          isOk: true
        });
      });

      it("with an octal number", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", 0144)
        ).toEqual({
          isOk: true
        });
      });

      it("with an hexadecimal number string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "0xFF")
        ).toEqual({
          isOk: true
        });
      });

      it("with an hexadecimal number", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", 0xFFF)
        ).toEqual({
          isOk: true
        });
      });
    });

    describe("floating points", function (){
      it("with a negative floating point string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "-1.6")
        ).toEqual({
          isOk: true
        });
      });

      it("with a positive floating point string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "4.5")
        ).toEqual({
          isOk: true
        });
      });

      it("with a negative floating point number", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", -1.3)
        ).toEqual({
          isOk: true
        });
      });

      it("with a positive floating point number", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", 2112.333)
        ).toEqual({
          isOk: true
        });
      });

      it("with exponential number", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", 3e8)
        ).toEqual({
          isOk: true
        });
      });

      it("with exponential string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "3e8")
        ).toEqual({
          isOk: true
        });
      });
    });

    describe("non-numeric things", function(){
      it("empty string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("whitespace string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "      ")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("tab", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "\t\t\t")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("alphanumeric string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "abcd12345")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("non-numeric string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "thiago moreira rocha")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("boolean true", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", true)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("boolean false", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", false)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("number with trailling non-numeric characters string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "7.2abcd")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("with undefined", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", undefined)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("with null", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", null)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("empty string", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", "")
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("with NaN", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", NaN)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("with infinity", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", Infinity)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("with positive infinity", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", Number.POSITIVE_INFINITY)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("with negative infinity", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", Number.NEGATIVE_INFINITY)
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("with a date", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", new Date(2014,05,02))
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("with an object", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", new Object())
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });

      it("with a function", function() {
        var rule = valkyr.predefinedRules.find("numeric");

        expect(
          rule.check("age", function(){})
        ).toEqual({
          isOk: false,
          message: "The age field must be a number."
        });
      });
    });
  });

  describe("required", function(){
    it("with a value", function(){
      var rule = valkyr.predefinedRules.find("required");

      expect(
        rule.check("username", "with some value")
      ).toEqual({
        isOk: true
      });
    });

    it("with an empty value", function(){
      var rule = valkyr.predefinedRules.find("required");

      expect(
        rule.check("username", "")
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });

    it("with an undefined value", function(){
      var rule = valkyr.predefinedRules.find("required");

      expect(
        rule.check("username", undefined)
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });

    it("with a null value", function(){
      var rule = valkyr.predefinedRules.find("required");

      expect(
        rule.check("username", null)
      ).toEqual({
        isOk: false,
        message: "The username field can't be empty."
      });
    });
  });

  describe("email", function(){
    it("simple extension email", function(){
      var rule = valkyr.predefinedRules.find("email");

      expect(
        rule.check("email", "valkyr@nordic.eu")
      ).toEqual({
        isOk: true
      });
    });

    it("double extension email", function(){
      var rule = valkyr.predefinedRules.find("email");

      expect(
        rule.check("email", "valkyr@nordic.eu.org")
      ).toEqual({
        isOk: true
      });
    });

    it("no @ email", function(){
      var rule = valkyr.predefinedRules.find("email");

      expect(
        rule.check("email", "valkyr_nordic.eu.org")
      ).toEqual({
        isOk: false,
        message: "The email field must contain a valid email address."
      });
    });

    it("no extension email", function(){
      var rule = valkyr.predefinedRules.find("email");

      expect(
        rule.check("email", "valkyr@nordic")
      ).toEqual({
        isOk: false,
        message: "The email field must contain a valid email address."
      });
    });

    it("an empty email", function(){
      var rule = valkyr.predefinedRules.find("email");

      expect(
        rule.check("email", "")
      ).toEqual({
        isOk: false,
        message: "The email field must contain a valid email address."
      });
    });
  });

  describe("url", function(){
    var rule = valkyr.predefinedRules.find("url");

    it("valid url", function(){
      expect(
        rule.check("youtube_link", "https://youtu.be/v/2jbna9f")
      ).toEqual({
        isOk: true
      });
    });

    it("an empty url", function(){
      var rule = valkyr.predefinedRules.find("url");

      expect(
        rule.check("youtube_link", "")
      ).toEqual({
        isOk: false,
        message: "The youtube_link field must contain a valid URL."
      });
    });

    it("an invalid url", function(){
      var rule = valkyr.predefinedRules.find("url");

      expect(
        rule.check("youtube_link", "ww.valkyr")
      ).toEqual({
        isOk: false,
        message: "The youtube_link field must contain a valid URL."
      });
    });
  });

  describe("integer", function(){
    it("with an integer", function(){
      var rule = valkyr.predefinedRules.find("integer");

      expect(
        rule.check("age", "1")
      ).toEqual({
        isOk: true
      });
    });

    it("with a big integer", function(){
      var rule = valkyr.predefinedRules.find("integer");

      expect(
        rule.check("age", "189713")
      ).toEqual({
        isOk: true
      });
    });

    it("with a negative integer", function(){
      var rule = valkyr.predefinedRules.find("integer");

      expect(
        rule.check("age", "-8")
      ).toEqual({
        isOk: true
      });
    });

    it("with a big negative integer", function(){
      var rule = valkyr.predefinedRules.find("integer");

      expect(
        rule.check("age", "-88127")
      ).toEqual({
        isOk: true
      });
    });

    it("with a double", function(){
      var rule = valkyr.predefinedRules.find("integer");

      expect(
        rule.check("age", "1.0")
      ).toEqual({
        isOk: false,
        message: "The age field must contain an integer."
      });
    });

    it("with an empty value", function(){
      var rule = valkyr.predefinedRules.find("integer");

      expect(
        rule.check("age", "")
      ).toEqual({
        isOk: false,
        message: "The age field must contain an integer."
      });
    });
  });

  describe("decimal", function(){
    it("with a decimal", function(){
      var rule = valkyr.predefinedRules.find("decimal");

      expect(
        rule.check("weight", "70.6")
      ).toEqual({
        isOk: true
      });
    });

    it("with a big decimal", function(){
      var rule = valkyr.predefinedRules.find("decimal");

      expect(
        rule.check("weight", "189.713")
      ).toEqual({
        isOk: true
      });
    });

    it("with a negative decimal", function(){
      var rule = valkyr.predefinedRules.find("decimal");

      expect(
        rule.check("weight", "-8.25")
      ).toEqual({
        isOk: true
      });
    });

    it("with a big negative decimal", function(){
      var rule = valkyr.predefinedRules.find("decimal");

      expect(
        rule.check("weigth", "-881.27")
      ).toEqual({
        isOk: true
      });
    });

    it("with an integer", function(){
      var rule = valkyr.predefinedRules.find("decimal");

      expect(
        rule.check("weigth", "1")
      ).toEqual({
        isOk: false,
        message: "The weigth field must contain a decimal number."
      });
    });

    it("with an empty value", function(){
      var rule = valkyr.predefinedRules.find("decimal");

      expect(
        rule.check("weigth", "")
      ).toEqual({
        isOk: false,
        message: "The weigth field must contain a decimal number."
      });
    });
  });

  describe("natural", function(){
    it("a positive number", function(){
      var rule = valkyr.predefinedRules.find("natural");

      expect(
        rule.check("age", "25")
      ).toEqual({
        isOk: true
      });
    });

    it("a negative number", function(){
      var rule = valkyr.predefinedRules.find("natural");

      expect(
        rule.check("age", "-25")
      ).toEqual({
        isOk: false,
        message: "The age field must contain only positive numbers."
      });
    });

    it("an empty value", function(){
      var rule = valkyr.predefinedRules.find("natural");

      expect(
        rule.check("age", "")
      ).toEqual({
        isOk: false,
        message: "The age field must contain only positive numbers."
      });
    });
  });

  describe("alphabetical", function(){
    it("a correct word", function(){
      var rule = valkyr.predefinedRules.find("alphabetical");

      expect(
        rule.check("username", "lukelex")
      ).toEqual({
        isOk: true
      });
    });

    it("a number", function(){
      var rule = valkyr.predefinedRules.find("alphabetical");

      expect(
        rule.check("username", "102839")
      ).toEqual({
        isOk: false,
        message: "The username field must only contain alphabetical characters."
      });
    });

    it("with spaces", function(){
      var rule = valkyr.predefinedRules.find("alphabetical");

      expect(
        rule.check("username", "luke lex")
      ).toEqual({
        isOk: false,
        message: "The username field must only contain alphabetical characters."
      });
    });

    it("an empty value", function(){
      var rule = valkyr.predefinedRules.find("alphabetical");

      expect(
        rule.check("username", "")
      ).toEqual({
        isOk: false,
        message: "The username field must only contain alphabetical characters."
      });
    });
  });

  describe("equals", function(){
    it("with equal values", function(){
      var form, rule;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"password\" value=\"1029384756\" />"

      rule = valkyr.predefinedRules.find("equals[password]").getExtraInfo(form);

      expect(
        rule.check("password_confirmation", "1029384756")
      ).toEqual({
        isOk: true
      });
    });

    it("with different values", function(){
      var form, rule;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"password\" value=\"1029384756\" />"

      rule = valkyr.predefinedRules.find("equals[password]").getExtraInfo(form);

      expect(
        rule.check("password_confirmation", "99999999")
      ).toEqual({
        isOk: false,
        message: "The password_confirmation field needs to be equal to password field."
      });
    });
  });

  describe("credit-card", function() {
    it("with a non-valid credit card number", function() {
      var rule = valkyr.predefinedRules.find("credit-card");

      expect(
        rule.check("CC", "1")
      ).toEqual({
        isOk: false,
        message: "The CC field doesn't have a valid credit-card number."
      });
    });

    it("with a valid credit card number", function() {
      var rule = valkyr.predefinedRules.find("credit-card");

      expect(
        rule.check("CC", "4984421209470251")
      ).toEqual({
        isOk: true
      });
    });
  });

  describe("ip", function() {
    it("valid value", function() {
      var rule = valkyr.predefinedRules.find("ip");

      expect(
        rule.check("router-ip", "192.168.0.1")
      ).toEqual({
        isOk: true
      });
    });

    it("invalid value", function() {
      var rule = valkyr.predefinedRules.find("ip");

      expect(
        rule.check("router-ip", "192.168")
      ).toEqual({
        isOk: false,
        message: "The router-ip field must contain a valid IP."
      });
    });

    it("oversized value", function() {
      var rule = valkyr.predefinedRules.find("ip");

      expect(
        rule.check("router-ip", "192.168.0.351")
      ).toEqual({
        isOk: false,
        message: "The router-ip field must contain a valid IP."
      });
    });
  });
});
