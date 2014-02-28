window.valkyr.parameterRule = function(spec){
  var obj = window.valkyr.rule(spec);

  function setParams(newParams){
    obj.params = newParams;
    return obj;
  } obj.setParams = setParams;

  function check(fieldName, value){
    var result = {
      isOk: obj.validator(value, obj.params)
    };
    if (!result.isOk) {
      result.message = obj.message.replace(/\%s/, fieldName);
      result.message = result.message.replace(/\%s/, obj.params);
    }

    return result;
  } obj.check = check;

  return obj;
};
