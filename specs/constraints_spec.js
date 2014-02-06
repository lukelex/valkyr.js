describe("Constraints", function(){
  describe("#initialize", function(){
    it("should build one rule", function(){
      var form, constraint;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/>";

      constraint = new valkyr.Constraint(form, {
        name: "username",
        rules: "required"
      });

      expect(constraint.$$rules.length).toEqual(1);
    });

    it("should build two rules", function(){
      var form, constraint;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/>";

      constraint = new valkyr.Constraint(form, {
        name: "username",
        rules: "required|numeric"
      });

      expect(constraint.$$rules.length).toEqual(2);
    });

    it("should build three rules", function(){
      var form, constraint;

      form = document.createElement("form");
      form.innerHTML = "<input name=\"username\"/>";

      constraint = new valkyr.Constraint(form, {
        name: "username",
        rules: "required|numeric|equals[username]"
      });

      expect(constraint.$$rules.length).toEqual(3);
    });
  });
});
