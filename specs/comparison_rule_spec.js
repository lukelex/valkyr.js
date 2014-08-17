describe("comparisonRule", function(){
  it("should pass in both values", function(){
    var validatorMock = jasmine.createSpy("validatorMock");

    valkyr.buildComparison({
      name: "dateBefore",
      message: "The %s field must be a negative number.",
      validator: validatorMock
    });

    var form = document.createElement("form");
    form.innerHTML = "<input name=\"beginDate\" value=\"1995-12-17T03:24:00\"/><input name=\"endDate\" value=\"1995-12-17T04:24:00\"/>";

    new valkyr.Validator(form, [{
      name: "beginDate",
      rules: "dateBefore[endDate]"
    }]).isValid();

    expect(
      validatorMock
    ).toHaveBeenCalledWith("1995-12-17T03:24:00", "1995-12-17T04:24:00");
  });
});
