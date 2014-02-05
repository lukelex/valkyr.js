describe("predefinedRules", function(){
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

  describe("url", function(){
    var rule = valkyr.predefinedRules["url"];

    it("valid url", function(){
      expect(
        rule.$check("youtube_link", "https://youtu.be/v/2jbna9f")
      ).toEqual({
        isOk: true
      })
    });

    it("an empty url", function(){
      var rule = valkyr.predefinedRules["url"];

      expect(
        rule.$check("youtube_link", "")
      ).toEqual({
        isOk: false,
        message: "The youtube_link field must contain a valid URL."
      });
    });

    it("an undefined url", function(){
      var rule = valkyr.predefinedRules["url"];

      expect(
        rule.$check("youtube_link", undefined)
      ).toEqual({
        isOk: false,
        message: "The youtube_link field must contain a valid URL."
      });
    });

    it("an invalid url", function(){
      var rule = valkyr.predefinedRules["url"];

      expect(
        rule.$check("youtube_link", "ww.valkyr")
      ).toEqual({
        isOk: false,
        message: "The youtube_link field must contain a valid URL."
      });
    });
  });

  describe("integer", function(){
    it("with an integer", function(){
      var rule = valkyr.predefinedRules["integer"];

      expect(
        rule.$check("age", "1")
      ).toEqual({
        isOk: true
      })
    });

    it("with a big integer", function(){
      var rule = valkyr.predefinedRules["integer"];

      expect(
        rule.$check("age", "189713")
      ).toEqual({
        isOk: true
      })
    });

    it("with a negative integer", function(){
      var rule = valkyr.predefinedRules["integer"];

      expect(
        rule.$check("age", "-8")
      ).toEqual({
        isOk: true
      })
    });

    it("with a big negative integer", function(){
      var rule = valkyr.predefinedRules["integer"];

      expect(
        rule.$check("age", "-88127")
      ).toEqual({
        isOk: true
      })
    });

    it("with a double", function(){
      var rule = valkyr.predefinedRules["integer"];

      expect(
        rule.$check("age", "1.0")
      ).toEqual({
        isOk: false,
        message: "The age field must contain an integer."
      })
    });

    it("with an empty value", function(){
      var rule = valkyr.predefinedRules["integer"];

      expect(
        rule.$check("age", "")
      ).toEqual({
        isOk: false,
        message: "The age field must contain an integer."
      })
    });

    it("with an undefined value", function(){
      var rule = valkyr.predefinedRules["integer"];

      expect(
        rule.$check("age", undefined)
      ).toEqual({
        isOk: false,
        message: "The age field must contain an integer."
      })
    });
  });

  describe("decimal", function(){
    it("with a decimal", function(){
      var rule = valkyr.predefinedRules["decimal"];

      expect(
        rule.$check("weight", "70.6")
      ).toEqual({
        isOk: true
      })
    });

    it("with a big decimal", function(){
      var rule = valkyr.predefinedRules["decimal"];

      expect(
        rule.$check("weight", "189.713")
      ).toEqual({
        isOk: true
      })
    });

    it("with a negative decimal", function(){
      var rule = valkyr.predefinedRules["decimal"];

      expect(
        rule.$check("weight", "-8.25")
      ).toEqual({
        isOk: true
      })
    });

    it("with a big negative decimal", function(){
      var rule = valkyr.predefinedRules["decimal"];

      expect(
        rule.$check("weigth", "-881.27")
      ).toEqual({
        isOk: true
      })
    });

    it("with an integer", function(){
      var rule = valkyr.predefinedRules["decimal"];

      expect(
        rule.$check("weigth", "1")
      ).toEqual({
        isOk: false,
        message: "The weigth field must contain a decimal number."
      })
    });

    it("with an empty value", function(){
      var rule = valkyr.predefinedRules["decimal"];

      expect(
        rule.$check("weigth", "")
      ).toEqual({
        isOk: false,
        message: "The weigth field must contain a decimal number."
      })
    });

    it("with an undefined value", function(){
      var rule = valkyr.predefinedRules["decimal"];

      expect(
        rule.$check("weigth", undefined)
      ).toEqual({
        isOk: false,
        message: "The weigth field must contain a decimal number."
      })
    });
  });
});
