window.valkyr.parameterRule = function(spec){
  var obj = window.valkyr.rule(spec);

  obj.setParams = function(newParams){
    obj.params = newParams;
    return obj;
  };

  obj.check = function(fieldName, value){
    var result = {
      isOk: obj.validator(value, obj.params)
    };
    if (!result.isOk) {
      result.message = obj.message.replace(/\%s/, fieldName);
      result.message = result.message.replace(/\%s/, obj.params);
    }

    return result;
  };

  return obj;
};
