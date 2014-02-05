(function(){
  var predefinedRules = {};

  predefinedRules["required"] = new window.valkyr.Rule({
    name: "required",
    message: "The %s field can't be empty.",
    validator: function(value){
      if (!value) { return false; }
      return value.length > 0;
    }
  });

  predefinedRules["email"] = new window.valkyr.Rule({
    name: "emailFormat",
    message: "The %s field must contain a valid email address.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(
        /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
      );
    }
  });

  predefinedRules["url"] = new window.valkyr.Rule({
    name: "url",
    message: "The %s field must contain a valid URL.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(
        /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
      );
    }
  });

  predefinedRules["integer"] = new window.valkyr.Rule({
    name: "integer",
    message: "The %s field must contain an integer.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(/^\-?[0-9]+$/);
    }
  });

  predefinedRules["decimal"] = new window.valkyr.Rule({
    name: "decimal",
    message: "The %s field must contain a decimal number.",
    validator: function(value){
      if (!value) { return false; }
      return !!value.match(/^\-?[0-9]*\.[0-9]+$/);
    }
  });

  window.valkyr.predefinedRules = predefinedRules;
})();
